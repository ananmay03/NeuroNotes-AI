import type { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "../../src/services/userStore";

console.log("Login API Loaded");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API endpoint hit with method:", req.method);

    if (req.method === "POST") {
        console.log("POST request detected");

        // Log the raw request body
        console.log("Request Body (raw):", req.body);

        const { username, password } = req.body;

        // Log parsed data
        console.log("Parsed username:", username);
        console.log("Parsed password:", password);

        if (!username || !password) {
            console.log("Username or password is missing");
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Check current users array before searching
        const user = findUser(username, password);
        console.log("Searching for user:", { username, password });

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
