type Note = {
    id: string;
    title: string;
    content: string;
};

const globalAny: any = global;
globalAny.notes = globalAny.notes || [];
const notes: Note[] = globalAny.notes;

const generateId = () => Math.random().toString(36).substring(2, 9);

export const createNote = (title: string, content: string) => {
    const newNote = { id: generateId(), title, content };
    notes.push(newNote);
    console.log("Note created:", newNote);
    console.log("Current notes array:", notes);
    return newNote;
};

export const getNotes = () => {
    console.log("Fetching all notes:", notes);
    return notes;
};

export const updateNote = (id: string, title: string, content: string) => {
    const note = notes.find(note => note.id === id);
    if (note) {
        note.title = title;
        note.content = content;
        console.log("Note updated:", note);
        return note;
    }
    console.log("Note not found for update:", id);
    return null;
};

export const deleteNote = (id: string) => {
    const index = notes.findIndex(note => note.id === id);
    if (index !== -1) {
        const removedNote = notes.splice(index, 1);
        console.log("Note deleted:", removedNote[0]);
        return removedNote[0];
    }
    console.log("Note not found for deletion:", id);
    return null;
};