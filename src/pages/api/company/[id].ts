import { NextApiRequest, NextApiResponse } from "next";
import runMiddleware from "@/utils/runMiddleware";
import multer from "multer";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
    api: {
        bodyParser: false, // ⛔ Nonaktifkan bodyParser
    },
};

//Multer Config
const uploadDir = path.join(process.cwd(), "upload", "logo");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi multer untuk simpan file di /upload/logo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error("Hanya file gambar yang diizinkan"));
        }
        cb(null, true);
    },
});


export default async function name(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/companies";

    if (req.method === "DELETE") {
        const { id } = req.query;
        console.log(req.query);
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE",
            });
            const data: any = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Delete failed" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete company" });
        }
    }

    if (req.method === "GET") {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Missing company ID" });
        }

        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data: any = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Delete failed" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "PUT") {
        let fileDeleted = false;

        try {
            // Ambil ID dari query
            const { id } = req.query;
            // console.log(req.query);

            if (!id) {
                return res.status(400).json({ error: "ID perusahaan tidak ditemukan di URL." });
            }

            // ⏳ Jalankan middleware upload
            await runMiddleware(req, res, upload.single("logo"));

            const { name, domain } = req.body;
            const file = (req as any).file;

            // 🔍 Validasi
            if (!name || !domain) {
                return res.status(400).json({
                    error: "Nama dan domain wajib diisi.",
                    debug: {
                        name_received: !!name,
                        domain_received: !!domain,
                        file_received: !!file,
                    },
                });
            }

            // 📤 Siapkan FormData
            const formData = new FormData();
            formData.append("name", name);
            formData.append("domain", domain);
            if (file) {
                formData.append("logo", fs.createReadStream(file.path), file.originalname);
            }

            // 🚀 Kirim ke backend Golang (GIN)
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                body: formData,
                headers: formData.getHeaders(),
            });

            const data = await response.json();
            // console.log("Data from backend:", data);

            // 🧹 Hapus file lokal jika ada
            if (file && fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
                fileDeleted = true;
            }

            // ❌ Jika gagal
            if (!response.ok) {
                let errorMessage = "Gagal memperbarui perusahaan.";
                if (data && typeof data === "object" && "message" in data) {
                    errorMessage = (data as { message: string }).message;
                }
                return res.status(response.status).json({
                    error: errorMessage,
                });
            }

            // ✅ Berhasil
            return res.status(200).json({
                message: "Perusahaan berhasil diperbarui.",
                data,
            });

        } catch (error: any) {
            console.error("❗ PUT error:", error);

            const filePath = (req as any).file?.path;
            if (filePath && fs.existsSync(filePath) && !fileDeleted) {
                fs.unlinkSync(filePath);
            }

            return res.status(500).json({
                error: "Terjadi kesalahan saat memperbarui perusahaan.",
                debug: error.message || error.toString(),
            });
        }
    }



    return res.status(405).json({ error: "Method not allowed" });
}