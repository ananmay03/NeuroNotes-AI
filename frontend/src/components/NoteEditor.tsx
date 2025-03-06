// src/components/NoteEditor.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface NoteFormData {
    title: string;
    content: string;
}

interface Note {
    id: string;
    title: string;
    content: string;
}

interface NoteEditorProps {
    note?: Note;
    onSave: (data: NoteFormData) => void;
    onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
    const [formData, setFormData] = useState<NoteFormData>({ title: '', content: '' });
    const [errors, setErrors] = useState<Partial<NoteFormData>>({});

    useEffect(() => {
        if (note) {
            setFormData({ title: note.title, content: note.content });
        }
    }, [note]);

    const validate = (): boolean => {
        const newErrors: Partial<NoteFormData> = {};
        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!formData.content.trim()) {
            newErrors.content = 'Content is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSave(formData);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
            <div className="bg-white rounded-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold">{note ? 'Edit Note' : 'Create Note'}</h2>
                    <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                            placeholder="Enter note title"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            rows={6}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                            placeholder="Enter note content"
                        />
                        {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            {note ? 'Save Changes' : 'Create Note'}
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};
