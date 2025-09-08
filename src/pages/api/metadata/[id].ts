import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/metadata";

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
                // teruskan error asli dari backend
                return res.status(response.status).json({
                    error: data.message || "Failed to fetch metadata",
                });
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
                return res.status(500).json({ error: data?.message});
            }
            return res.status(200).json({ message: "Metadata deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete data" });
        }
    }

    if (req.method === "PUT") {
        const { id } = req.query;
        const { form } = req.body;
        if (!id || !form) {
            return res.status(400).json({ error: "All fields are required" });
        }
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ form }),
            });
            if (!response.ok) {
                return res.status(500).json({ error: "Failed to update metadata" });
            }
            return res.status(200).json({ message: "Metadata updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Failed to update data" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}