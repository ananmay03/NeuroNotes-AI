// pages/api/notesApi.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createNote, getNotes } from "../../src/services/noteStore";
import { ApiError, handleApiError } from "../../src/utils/apiError";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const notes = getNotes();
            res.status(200).json(notes);
        } else if (req.method === "POST") {
            const { title, content } = req.body;
            if (!title || !content) {
                throw new ApiError("Title and content are required", 400);
            }
            const newNote = createNote(title, content);
            res.status(201).json(newNote);
        } else {
            throw new ApiError(`Method ${req.method} not allowed`, 405);
        }
    } catch (error) {
        handleApiError(res, error);
    }
}
