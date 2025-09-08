import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/languages";

    if (req.method === "GET") {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Missing language ID" });
        }
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Failed to fetch language" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Missing language ID" });
        }
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Failed to delete language" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete data" });
        }
    }

    if (req.method === "PUT") {
        const { id } = req.query;
        const { code, name } = req.body;

        // pastikan id diubah ke number
        const languageId = parseInt(id as string, 10);

        console.log("debug", languageId, code, name);

        if (isNaN(languageId) || !code || !name) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const response = await fetch(`${baseUrl}/${languageId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: languageId, code, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                return res
                    .status(response.status)
                    .json({ error: data?.message || "Failed to update language" });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update data" });
        }
    }


    return res.status(405).json({ error: "Method not allowed" });
}