import axios from "axios";

const API_URL = "http://localhost:5000/api";

// User Authentication APIs
export const registerUser = async (username: string, password: string) => {
  const response = await axios.post("/api/register", { username, password });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post("/api/login", { username, password });
  return response.data;
};

// Note Management APIs
export const fetchNotes = async () => {
  const response = await axios.get(`${API_URL}/notes`);
  return response.data.notes;
};

export const createNote = async (title: string, content: string) => {
  const response = await axios.post(`${API_URL}/notes`, { title, content });
  return response.data.note;
};

export const updateNote = async (id: number, title: string, content: string) => {
  const response = await axios.put(`${API_URL}/notes/${id}`, { title, content });
  return response.data.note;
};

export const deleteNote = async (id: number) => {
  const response = await axios.delete(`${API_URL}/notes/${id}`);
  return response.data;
};
