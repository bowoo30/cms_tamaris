import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import fs from "fs";
import path from "path";
import FormData from 'form-data';
import runMiddleware from "@/utils/runMiddleware";
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





export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/companies";

    if (req.method === "GET") {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                return res.status(500).json({ error: "Failed to fetch companies" });
            }
            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "PUT") {
        const { name, logo, domain } = req.body;

        if (!name || !logo || !domain) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const response = await fetch(`${baseUrl}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, logo, domain }),
            });

            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({
                    error: (data && typeof data === "object" && "message" in data) ? data.message : "Unknown error"
                });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update company" });
        }
    }

    if (req.method === "POST") {
        let fileDeleted = false;

        try {
            // ⏳ Jalankan middleware untuk menangani upload file
            await runMiddleware(req, res, upload.single("logo"));

            const { name, domain } = req.body;
            const file = (req as any).file;

            // 🔍 Validasi input
            if (!name || !domain || !file) {
                return res.status(400).json({
                    error: "Semua field wajib diisi",
                    debug: {
                        name_received: !!name,
                        domain_received: !!domain,
                        file_received: !!file,
                    },
                });
            }

            // 📤 Siapkan FormData untuk dikirim ke backend Gin
            const formData = new FormData();
            formData.append("name", name);
            formData.append("domain", domain);
            formData.append("logo", fs.createReadStream(file.path), file.originalname);

            // 🚀 Kirim ke backend Gin
            const response = await fetch(`${baseUrl}/register`, {
                method: "POST",
                body: formData,
                headers: formData.getHeaders(), // ⛓️ Wajib untuk multipart boundary
            });

            const data = await response.json();

            // 🧹 Hapus file setelah selesai
            fs.unlinkSync(file.path);
            fileDeleted = true;

            // ❌ Jika response gagal
            if (!response.ok) {
                let errorMessage = "Unknown error";
                if (data && typeof data === "object" && "message" in data) {
                    errorMessage = (data as { message: string }).message;
                }
                return res.status(response.status).json({
                    error: errorMessage
                });
            }

            // ✅ Response sukses
            return res.status(200).json({
                message: "Company berhasil ditambahkan",
                data,
            });

        } catch (error: any) {
            console.error("❗ Upload error:", error);

            // 🧹 Hapus file jika belum dihapus
            const filePath = (req as any).file?.path;
            if (filePath && fs.existsSync(filePath) && !fileDeleted) {
                fs.unlinkSync(filePath);
            }

            return res.status(500).json({
                error: "Gagal mengunggah logo",
                debug: error.message || error.toString(),
            });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
