import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/pages";

    if (req.method === "GET") {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                return res.status(500).json({ error: "Failed to fetch pages" });
            }

            const data = await response.json();
            console.log("API response:", data);
            
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "POST") {
        const { company_id, title } = req.body;

        if (!title) {
            return res.status(400).json({ error: "All fields are required" });
        }

        console.log(title, company_id);
        console.log(req.body);
        

        try {
            const response = await fetch(`${baseUrl}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, company_id }),
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Create failed" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create page" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}