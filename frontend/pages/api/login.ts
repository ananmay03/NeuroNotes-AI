import type { NextApiRequest, NextApiResponse } from "next";
import { findUser } from "../../src/services/userStore";
import { ApiError, handleApiError } from "../../src/utils/apiError";

console.log("Login API Loaded");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        console.log("API endpoint hit with method:", req.method);

        if (req.method !== "POST") {
            throw new ApiError(`Method ${req.method} not allowed`, 405);
        }

        const { username, password } = req.body;

        console.log("Parsed username:", username);
        console.log("Parsed password:", password);

        if (!username || !password) {
            throw new ApiError("Username and password are required", 400);
        }

        const user = await findUser(username, password);

        if (!user) {
            throw new ApiError("Invalid credentials", 401);
        }

        console.log("Login successful for user:", username);
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        handleApiError(res, error);
    }
}
