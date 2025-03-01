import { useState } from "react";
import { createNote } from "../../src/services/api"; // Corrected path
import { useRouter } from "next/router";

export default function CreateNotePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNote(title, content);
      router.push("/notes");
    } catch (error) {
      console.error("Failed to create note", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Note</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Create Note</button>
    </form>
  );
}
