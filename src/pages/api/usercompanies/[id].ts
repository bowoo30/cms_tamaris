import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = `http://localhost:8080/api/v1/user_companies`;

    if (req.method === "GET") {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "Missing user ID" });
        }

        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            console.log("API response:", data);

            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Failed to fetch user companies" });
            }

            return res.status(200).json(data);
        } catch (error) {
            console.error("Fetch error:", error);
            return res.status(500).json({ error: "Failed to get user company" });
        }

    }

    return res.status(405).json({ error: "Method not allowed" });
}
