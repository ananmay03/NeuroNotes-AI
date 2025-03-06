import type { NextApiRequest, NextApiResponse } from "next";
import { addUser, isUserExists } from "../../src/services/userStore";
import { ApiError, handleApiError } from "../../src/utils/apiError";

console.log("Register API Loaded");

const MIN_PASSWORD_LENGTH = 6;
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

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

        if (!USERNAME_REGEX.test(username)) {
            throw new ApiError("Username must be 3-20 characters long and contain only letters, numbers, and underscores", 400);
        }

        if (password.length < MIN_PASSWORD_LENGTH) {
            throw new ApiError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters long`, 400);
        }

        if (isUserExists(username)) {
            throw new ApiError("User already exists", 409);
        }

        await addUser(username, password);
        console.log("User registered successfully:", username);
        res.status(200).json({ message: "User registered successfully" });

    } catch (error) {
        handleApiError(res, error);
    }
}
