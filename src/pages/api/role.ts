import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/roles";

    if (req.method === "GET") {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                return res.status(500).json({ error: "Failed to fetch roles" });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}