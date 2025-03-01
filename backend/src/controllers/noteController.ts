import { Request, Response } from "express";

interface Note {
  id: number;
  title: string;
  content: string;
}

// In-memory notes storage for demonstration
let notes: Note[] = [];
let nextId = 1;

// Create a new note
export const createNote = async (req: Request, res: Response): Promise<void> => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: "Title and content are required" });
    return;
  }
  const note: Note = {
    id: nextId++,
    title,
    content,
  };
  notes.push(note);
  res.status(201).json({ message: "Note created successfully", note });
};

// Get all notes
export const getNotes = async (req: Request, res: Response): Promise<void> => {
  res.json({ notes });
};

// Update an existing note by ID
export const updateNote = async (req: Request, res: Response): Promise<void> => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;
  const index = notes.findIndex((n) => n.id === noteId);
  if (index === -1) {
    res.status(404).json({ message: "Note not found" });
    return;
  }
  const updatedNote = { ...notes[index], title, content };
  notes[index] = updatedNote;
  res.json({ message: "Note updated successfully", note: updatedNote });
};

// Delete a note by ID
export const deleteNote = async (req: Request, res: Response): Promise<void> => {
  const noteId = parseInt(req.params.id);
  const index = notes.findIndex((n) => n.id === noteId);
  if (index === -1) {
    res.status(404).json({ message: "Note not found" });
    return;
  }
  notes.splice(index, 1);
  res.json({ message: "Note deleted successfully" });
};
