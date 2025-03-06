// pages/notes/index.tsx
import { useEffect, useState } from "react";
import { fetchNotes, deleteNote, updateNote, createNote } from "../../src/services/api";
import { NoteCard } from "../../src/components/NoteCard";
import { NoteEditor } from "../../src/components/NoteEditor";

interface Note {
    id: string;
    title: string;
    content: string;
    updatedAt: string;
}

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [editMode, setEditMode] = useState<Note | null>(null);
    const [showEditor, setShowEditor] = useState(false);

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

    const handleDelete = async (note: Note) => {
        console.log("Attempting to delete note:", note);
        try {
            await deleteNote(note.id);
            setNotes(notes.filter(n => n.id !== note.id));
        } catch (error) {
            console.error("Failed to delete note", error);
        }
    };

    const handleEdit = (note: Note) => {
        setEditMode(note);
        setShowEditor(true);
    };

    const handleCreate = () => {
        setEditMode(null);
        setShowEditor(true);
    };

    const handleSave = async (data: { title: string; content: string }) => {
        console.log("Saving note:", data);
        try {
            if (editMode) {
                console.log("Updating existing note with ID:", editMode.id);
                await updateNote(editMode.id, data.title, data.content);
                setNotes(notes.map(n =>
                    n.id === editMode.id
                        ? { ...n, ...data, updatedAt: new Date().toISOString() }
                        : n
                ));
            } else {
                console.log("Creating a new note");
                const newNote = await createNote(data.title, data.content);
                setNotes([...notes, { ...newNote, updatedAt: new Date().toISOString() }]);
            }
            setShowEditor(false);
            setEditMode(null);
        } catch (error) {
            console.error("Failed to save note", error);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Notes</h2>
                <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Create New Note
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {showEditor && (
                <NoteEditor
                    note={editMode}
                    onSave={handleSave}
                    onCancel={() => setShowEditor(false)}
                />
            )}
        </div>
    );
}
