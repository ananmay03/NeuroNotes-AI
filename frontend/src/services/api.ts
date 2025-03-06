// src/services/api.ts
import axios from "axios";

// Fetch all notes
export const fetchNotes = async () => {
    const response = await axios.get("/api/notesApi"); // Updated path
    return response.data;
};

// Create a new note
export const createNote = async (title: string, content: string) => {
    const response = await axios.post("/api/notesApi", { title, content });
    return response.data;
};

// Update a specific note by ID
export const updateNote = async (id: string, title: string, content: string) => {
  const response = await axios.put(`/api/${id}`, { title, content });
  return response.data;
};

// Delete a specific note by ID
export const deleteNote = async (id: string) => {
  const response = await axios.delete(`/api/${id}`);
  return response.data;
};


// Add registerUser and loginUser to the API service
export const registerUser = async (username: string, password: string) => {
    const response = await axios.post("/api/register", { username, password });
    return response.data;
};

export const loginUser = async (username: string, password: string) => {
    const response = await axios.post("/api/login", { username, password });
    return response.data;
};  