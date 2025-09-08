import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = "http://localhost:8080/api/v1/users";

    if (req.method === "GET") {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                return res.status(500).json({ error: "Failed to fetch users" });
            }

            const data = await response.json();
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: "Failed to fetch data" });
        }
    }

    if (req.method === "POST") {
        const { nameAdd: name, emailAdd: email, passwordAdd: passwword } = req.body;

        console.log(req.body);
        if (!name || !email || !passwword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            const response = await fetch("http://localhost:8080/api/v1/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, passwword }),
            });

            const data = await response.json();

            if (!response.ok) {
                return res.status(response.status).json({ error: data?.message});
            }

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
