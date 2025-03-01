"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNotes = exports.createNote = void 0;
// In-memory notes storage for demonstration
let notes = [];
let nextId = 1;
// Create a new note
const createNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ message: "Title and content are required" });
        return;
    }
    const note = {
        id: nextId++,
        title,
        content,
    };
    notes.push(note);
    res.status(201).json({ message: "Note created successfully", note });
});
exports.createNote = createNote;
// Get all notes
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ notes });
});
exports.getNotes = getNotes;
// Update an existing note by ID
const updateNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = parseInt(req.params.id);
    const { title, content } = req.body;
    const index = notes.findIndex((n) => n.id === noteId);
    if (index === -1) {
        res.status(404).json({ message: "Note not found" });
        return;
    }
    const updatedNote = Object.assign(Object.assign({}, notes[index]), { title, content });
    notes[index] = updatedNote;
    res.json({ message: "Note updated successfully", note: updatedNote });
});
exports.updateNote = updateNote;
// Delete a note by ID
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = parseInt(req.params.id);
    const index = notes.findIndex((n) => n.id === noteId);
    if (index === -1) {
        res.status(404).json({ message: "Note not found" });
        return;
    }
    notes.splice(index, 1);
    res.json({ message: "Note deleted successfully" });
});
exports.deleteNote = deleteNote;
