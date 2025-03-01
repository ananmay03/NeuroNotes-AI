import { useEffect, useState } from "react";
import { fetchNotes } from "../../src/services/api"; // Corrected path

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes", error);
      }
    };
    loadNotes();
  }, []);

  return (
    <div>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
