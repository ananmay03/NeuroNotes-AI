import type { NextApiRequest, NextApiResponse } from "next";

type User = {
    username: string;
    password: string;
};

// Simple in-memory storage for users (this is temporary and not persistent)
const users: User[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        const existingUser = users.find(user => user.username === username);

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        users.push({ username, password });
        res.status(200).json({ message: "User registered successfully" });
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
