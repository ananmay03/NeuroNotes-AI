import type { NextApiRequest, NextApiResponse } from "next";
import { addUser, isUserExists } from "../../src/services/userStore";

console.log("Register API Loaded");

const MIN_PASSWORD_LENGTH = 6;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API endpoint hit with method:", req.method);

    if (req.method === "POST") {
        console.log("POST request detected");

        const { username, password } = req.body;

        console.log("Parsed username:", username);
        console.log("Parsed password:", password);

        // Validation: Check if username and password are not empty
        if (!username || !password) {
            console.log("Username or password is missing");
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Validation: Check username format
        if (!USERNAME_REGEX.test(username)) {
            console.log("Invalid username format");
            return res.status(400).json({ message: "Username must be 3-20 characters long and contain only letters, numbers, and underscores" });
        }

        // Validation: Check password complexity
        if (password.length < MIN_PASSWORD_LENGTH) {
            console.log("Password is too short");
            return res.status(400).json({ message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` });
        }

        // Check if the user already exists
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
