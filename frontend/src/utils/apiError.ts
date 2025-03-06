import { NextApiResponse } from "next";

export class ApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
        this.name = "ApiError";
    }
}

export function handleApiError(res: NextApiResponse, error: unknown) {
    if (error instanceof ApiError) {
        console.error(`API Error: ${error.message}`);
        res.status(error.statusCode).json({ message: error.message });
    } else if (error instanceof Error) {
        console.error(`Unexpected Error: ${error.message}`);
        res.status(500).json({ message: "An unexpected error occurred" });
    } else {
        console.error("Unknown error:", error);
        res.status(500).json({ message: "An unknown error occurred" });
    }
}
