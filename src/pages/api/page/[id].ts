import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/pages";

    if (req.method === "GET") {
        const { id } = req.query;
        
        if (!id) {
            return res.status(400).json({ error: "Missing page ID" });
        }
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Failed to fetch page" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "DELETE") {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Missing page ID" });
            
        }
        console.log(id);
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Delete failed" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete page" });
        }
    }

    if (req.method === "PUT") {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({ error: "Missing page ID" });
        }

        const { title, company_id } = req.body;
        console.log("Next.js API Received:", req.body,id);

        if (!title) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title,
                    company_id
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Update failed" });
            }
            return res.status(200).json(data);

        } catch (error) {
            // console.error("Error updating page:", error);
            return res.status(500).json({ error: "Failed to update page" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}