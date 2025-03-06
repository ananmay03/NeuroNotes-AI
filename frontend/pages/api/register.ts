import type { NextApiRequest, NextApiResponse } from "next";
import { addUser, isUserExists } from "../../src/services/userStore";

console.log("Register API Loaded"); // Should show when server starts

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API endpoint hit with method:", req.method); // Shows when the API is called

    if (req.method === "POST") {
        console.log("POST request detected");

        // Log the raw body data received
        console.log("Request Body (raw):", req.body);

        const { username, password } = req.body;
        
        // Log the parsed data
        console.log("Parsed username:", username);
        console.log("Parsed password:", password);

        if (!username || !password) {
            console.log("Username or password is missing");
            return res.status(400).json({ message: "Username and password are required" });
        }

        if (isUserExists(username)) {
            console.log("User already exists:", username);
            return res.status(400).json({ message: "User already exists" });
        }

        addUser(username, password);
        console.log("User registered successfully:", username);
        res.status(200).json({ message: "User registered successfully" });
    } else {
        console.log("Method not allowed:", req.method);
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
