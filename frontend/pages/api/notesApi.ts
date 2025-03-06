// pages/api/notes.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createNote, getNotes, updateNote, deleteNote } from "../../src/services/noteStore";
import { ApiError, handleApiError } from "../../src/utils/apiError";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req;
        const { id } = req.query;

        if (method === "GET") {
            const notes = getNotes();
            res.status(200).json(notes);
        } else if (method === "POST") {
            const { title, content } = req.body;
            if (!title || !content) throw new ApiError("Title and content are required", 400);
            const newNote = createNote(title, content);
            res.status(201).json(newNote);
        } else if (method === "PUT" && typeof id === "string") {
            const { title, content } = req.body;
            if (!title || !content) throw new ApiError("Title and content are required", 400);
            const updatedNote = updateNote(id, title, content);
            if (!updatedNote) throw new ApiError("Note not found", 404);
            res.status(200).json(updatedNote);
        } else if (method === "DELETE" && typeof id === "string") {
            const deletedNote = deleteNote(id);
            if (!deletedNote) throw new ApiError("Note not found", 404);
            res.status(200).json(deletedNote);
        } else {
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        handleApiError(res, error);
    }
}
