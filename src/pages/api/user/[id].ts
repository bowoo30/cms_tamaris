import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/users";

    if (req.method === "PUT") {
        const { id } = req.query
        const { name, email, password, role_id } = req.body;

        // console.log(req.body);

        if (!id || !name || !email || !password || !role_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, role_id }),
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Update failed" });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to update user" });
        }
    }

    if (req.method === "DELETE") {
        const { id } = req.query;

        console.log("Deleting User:", id);

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({ error: data?.error || "Delete failed" });
            }

            return res.status(200).json({ message: "User deleted successfully", id });
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete user" });
        }
    }

    if (req.method === "GET") {
        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "GET",
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({ error: data?.error || "Delete failed" });
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to delete user" });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
