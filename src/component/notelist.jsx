import React from 'react';
import '../styles/notelist.css'
import NoteItem from './noteItem';

export default function NoteList({ notes, title, onDelete, onToggleArchive, showLink = false, emptyMessage = "Tidak ada catatan" }) {
    return (
        <section className="note-list-section">
            <h2 className="note-list-title">{title}</h2>
            {notes.length === 0 ? (
                <div className="empty-message">
                    <p className="empty-message-text">{emptyMessage}</p>
                </div>
            ) : (
                <div className="note-list-items">
                    {notes.map((n) => (
                        <NoteItem 
                            key={n.id} 
                            note={n} 
                            onDelete={onDelete} 
                            onToggleArchive={onToggleArchive}
                            showLink={showLink}
                        />
                    ))}
                </div>
            )}
        </section>
    )
}