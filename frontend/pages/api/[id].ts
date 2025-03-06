// pages/api/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import { updateNote, deleteNote } from "../../src/services/noteStore";
import { ApiError, handleApiError } from "../../src/utils/apiError";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req;
        const { id } = req.query;

        console.log("API Called - Method:", method);
        console.log("ID Received:", id);

        if (!id || typeof id !== "string") {
            console.error("Invalid ID received:", id);
            throw new ApiError("Invalid ID", 400);
        }

        if (method === "PUT") {
            const { title, content } = req.body;
            console.log("Update Request Body:", req.body);

            if (!title || !content) {
                console.error("Missing title or content in update request");
                throw new ApiError("Title and content are required", 400);
            }
            const updatedNote = updateNote(id, title, content);
            if (!updatedNote) {
                console.error("Note not found for update:", id);
                throw new ApiError("Note not found", 404);
            }
            console.log("Note updated successfully:", updatedNote);
            res.status(200).json(updatedNote);
        } else if (method === "DELETE") {
            console.log("Attempting to delete note with ID:", id);
            const deletedNote = deleteNote(id);
            if (!deletedNote) {
                console.error("Note not found for deletion:", id);
                throw new ApiError("Note not found", 404);
            }
            console.log("Note deleted successfully:", deletedNote);
            res.status(200).json(deletedNote);
        } else {
            res.setHeader("Allow", ["PUT", "DELETE"]);
            res.status(405).end(`Method ${method} not allowed`);
        }
    } catch (error) {
        handleApiError(res, error);
    }
}
