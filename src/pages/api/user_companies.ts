import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/user_companies/register";

    if (req.method === "POST") {
        let { user_id, company_id } = req.body;
        // console.log(req.body);

        user_id = Number(user_id);
        company_id = Number(company_id);

        if (!user_id || !company_id) {
            return res.status(400).json({ error: "All fields are required" });
        }
        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id, company_id }),
            });
            const data = await response.json();
            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message || "Create failed" });
            }
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to create user company" });
        }
    }

    if (req.method === "DELETE") {
        const { user_id, company_id } = req.body;

        console.log("Frontend delete:", user_id, company_id);

        if (!user_id || !company_id) {
            return res.status(400).json({ error: "Missing user_id or company_id" });
        }

        try {
            const response = await fetch(
                `${baseUrl}?user_id=${user_id}&company_id=${company_id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({
                    error: data?.message || "Delete failed",
                });
            }

            return res.status(200).json(data);
        } catch (error: any) {
            console.error("Error deleting user company:", error);
            return res.status(500).json({
                error: "Failed to delete user company",
            });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}