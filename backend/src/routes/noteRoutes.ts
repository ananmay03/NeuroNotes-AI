import express, { Request, Response } from "express";
import { createNote, getNotes, updateNote, deleteNote } from "../controllers/noteController";

const router = express.Router();

// Optional: Debug route to check if note routes are working
router.post("/debug", (req: Request, res: Response) => {
  console.log("Notes debug route hit");
  res.send("Notes debug route working");
});

// Create a note
router.post("/", async (req: Request, res: Response) => {
  try {
    await createNote(req, res);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Get all notes
router.get("/", async (req: Request, res: Response) => {
  try {
    await getNotes(req, res);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Update a note by ID
router.put("/:id", async (req: Request, res: Response) => {
  try {
    await updateNote(req, res);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a note by ID
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    await deleteNote(req, res);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
