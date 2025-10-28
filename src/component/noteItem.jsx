import React from 'react';
import { Link } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import '../styles/noteItem.css';

export default function NoteItem({ note, onDelete, onToggleArchive, showLink = false }) {
    const content = (
        <>
            <h4 className="note-title">{note.title}</h4>
            <small className="note-date">{showFormattedDate(note.createdAt)}</small>
            <p className="note-body">{note.body}</p>
        </>
    );

    return (
        <div className={`note-item-container ${note.archived ? 'archived' : ''}`}>
            {showLink ? (
                <Link to={`/notes/${note.id}`} className="note-link">
                    {content}
                </Link>
            ) : (
                content
            )}
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