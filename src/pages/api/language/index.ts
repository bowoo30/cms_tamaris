import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/languages";

    if (req.method === "GET") {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                return res.status(500).json({ error: "Failed to fetch languages" });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "POST") {
        const { code, name } = req.body;
        console.log(req.body);
        
        if (!code || !name) {
            return res.status(400).json({ error: "All fields are required" });
        }
        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, name }),
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Create failed" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create language" });
        }
    }
}

