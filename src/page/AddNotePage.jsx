import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotesContext } from '../app';
import NoteForm from '../component/noteform';

import '../styles/page.css'

export default function AddNotePage() {
    const { handleAddNote } = useContext(NotesContext);
    const navigate = useNavigate();

    const onAddNote = (note) => {
        handleAddNote(note);
        navigate('/');
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h2 className="page-title">Tambah Catatan Baru</h2>
            </div>

            <NoteForm onAddNote={onAddNote} />
        </div>
    );
}