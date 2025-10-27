import React from 'react';
import "../styles/notelist.css"
import NoteItem from './noteItem';


export default function NoteList({ notes, title, onDelete, onToggleArchive }) {
    return (
        <section className="note-list-section">
            <h2 className="note-list-title">{title}</h2>
            {notes.length === 0 ? (
                <div className="empty-message">
                    <p className="empty-message-text">Tidak ada catatan</p>
                </div>
            ) : (
                <div className="note-list-items">
                    {notes.map((n) => (
                        <NoteItem 
                            key={n.id} 
                            note={n} 
                            onDelete={onDelete} 
                            onToggleArchive={onToggleArchive} 
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
