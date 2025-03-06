// src/components/NoteCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Note {
    id: string;
    title: string;
    content: string;
    updatedAt: string; // Ensure this is a string that can be converted to a Date
}

interface NoteCardProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (note: Note) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
    const updatedAtDate = new Date(note.updatedAt);
    const formattedDate = isNaN(updatedAtDate.getTime())
        ? "Invalid date"
        : formatDistanceToNow(updatedAtDate, { addSuffix: true });

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col group relative"
        >
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onEdit(note)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Edit note"
                >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                    onClick={() => onDelete(note)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    title="Delete note"
                >
                    <Trash2 className="w-4 h-4 text-red-500" />
                </button>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{note.title}</h3>
            <p className="text-gray-600 flex-grow line-clamp-3">{note.content}</p>
            <div className="mt-4 text-sm text-gray-400">
                Updated {formattedDate}
            </div>
        </motion.div>
    );
};
