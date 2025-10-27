import React from 'react';
import { showFormattedDate } from '../utils';
import '../styles/noteItem.css';

export default function NoteItem({ note, onDelete, onToggleArchive }) {
    return (
        <div className={`note-item-container ${note.archived ? 'archived' : ''}`}>
            <h4 className="note-title">{note.title}</h4>
            <small className="note-date">{showFormattedDate(note.createdAt)}</small>
            <p className="note-body">{note.body}</p>
            <div className="note-actions">
                <button 
                    onClick={() => onDelete(note.id)} 
                    className="action-btn delete-btn"
                >
                    Hapus
                </button>
                <button 
                    onClick={() => onToggleArchive(note.id)} 
                    className="action-btn archive-btn"
                >
                    {note.archived ? 'Pindahkan' : 'Arsipkan'}
                </button>
            </div>
        </div>
    );
}