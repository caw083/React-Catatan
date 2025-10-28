import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../component/noteform';
import { addNote } from '../utils/api';

import '../styles/page.css';

export default function AddNotePage() {
    const navigate = useNavigate();

    const handleAddNote = async ({ title, body }) => {
        const { error } = await addNote({ title, body });
        
        if (!error) {
            navigate('/');
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2 className="page-title">Tambah Catatan Baru</h2>
            </div>

            <NoteForm onAddNote={handleAddNote} />
        </div>
    );
}