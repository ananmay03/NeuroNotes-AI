import type { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "../../src/services/userStore";

console.log("Login API Loaded");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API endpoint hit with method:", req.method);

    if (req.method === "POST") {
        console.log("POST request detected");

        const { username, password } = req.body;

        console.log("Parsed username:", username);
        console.log("Parsed password:", password);

        if (!username || !password) {
            console.log("Username or password is missing");
            return res.status(400).json({ message: "Username and password are required" });
        }

        const user = await findUser(username, password);

        if (user) {
            console.log("Login successful for user:", username);
            res.status(200).json({ message: "Login successful" });
        } else {
            console.log("Invalid credentials for user:", username);
            res.status(401).json({ message: "Invalid credentials" });
        }
    } else {
        console.log("Method not allowed:", req.method);
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
