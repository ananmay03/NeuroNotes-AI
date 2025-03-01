import type { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "../../src/services/userStore";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = findUser(username, password);

        if (user) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
