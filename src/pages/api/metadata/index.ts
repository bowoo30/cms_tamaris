import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/metadata";

    if (req.method === "GET") {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                return res.status(500).json({ error: "Failed to fetch metadata" });
            }

            const data = await  response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "POST") {
        const form  = req.body;
        if (!form) {
            return res.status(400).json({ error: "All fields are required" });
        }

        console.log(form);
        
        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Failed to fetch metadata" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}