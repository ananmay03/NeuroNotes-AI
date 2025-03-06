import { useEffect, useState } from "react";
import { fetchNotes, deleteNote, updateNote } from "../../src/services/api";

interface Note {
    id: string;
    title: string;
    content: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editMode, setEditMode] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const data = await fetchNotes();
                console.log("Fetched notes:", data);
                setNotes(data);
            } catch (error) {
                console.error("Failed to fetch notes", error);
            }
        };
        loadNotes();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            await deleteNote(id);
            setNotes(notes.filter(note => note.id !== id));
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    const handleEdit = (note: Note) => {
        setEditMode(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const handleUpdate = async () => {
        if (!editMode) return;

        try {
            await updateNote(editMode, editTitle, editContent);
            setNotes(notes.map(note => 
                note.id === editMode ? { ...note, title: editTitle, content: editContent } : note
            ));
            setEditMode(null);
            setEditTitle("");
            setEditContent("");
        } catch (error) {
            console.error("Failed to update note", error);
        }
    };

    return (
        <div>
            <h2>Notes</h2>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {notes.map((note) => (
                    <li key={note.id} style={{ marginBottom: "20px" }}>
                        {editMode === note.id ? (
                            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    style={{ flex: "1", padding: "5px" }}
                                />
                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    style={{ flex: "2", padding: "5px", minHeight: "60px" }}
                                />
                                <button
                                    onClick={handleUpdate}
                                    style={{
                                        backgroundColor: "blue",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                        borderRadius: "5px"
                                    }}
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => setEditMode(null)}
                                    style={{
                                        backgroundColor: "gray",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                        borderRadius: "5px"
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <h3 style={{ margin: "5px 0" }}>{note.title}</h3>
                                    <p style={{ margin: "5px 0" }}>{note.content}</p>
                                </div>
                                <div>
                                    <button
                                        onClick={() => handleEdit(note)}
                                        style={{
                                            backgroundColor: "blue",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            marginRight: "5px",
                                            cursor: "pointer",
                                            borderRadius: "5px"
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(note.id)}
                                        style={{
                                            backgroundColor: "red",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            cursor: "pointer",
                                            borderRadius: "5px"
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
