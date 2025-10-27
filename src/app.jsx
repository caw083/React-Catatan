import React, { useState, useMemo } from 'react';
import './styles/app.css';
import { getInitialData } from './utils';
import Navigation from './components/navigation';
import SearchBar from './components/searcbar';
import NoteForm from './components/noteform';
import NoteList from './components/notelist';

export default function App() {
    const [notes, setNotes] = useState(getInitialData());
    const [search, setSearch] = useState('');

    const handleAddNote = ({ title, body }) => {
        const newNote = {
            id: +new Date(), // unique id using timestamp
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
        };
        setNotes((prev) => [newNote, ...prev]);
    }

    const handleDelete = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    }

    const handleToggleArchive = (id) => {
        setNotes((prev) => prev.map((n) => n.id === id ? {...n, archived: !n.archived} : n));
    }

    // Derived lists with search filter (search only matches title)
    const filteredActive = useMemo(() => {
        const active = notes.filter((n) => !n.archived);
        if (!search.trim()) return active;
        const q = search.toLowerCase();
        return active.filter((n) => n.title.toLowerCase().includes(q));
    }, [notes, search]);

    const filteredArchived = useMemo(() => {
        const archived = notes.filter((n) => n.archived);
        if (!search.trim()) return archived;
        const q = search.toLowerCase();
        return archived.filter((n) => n.title.toLowerCase().includes(q));
    }, [notes, search]);

    return (
        <div className="app-container">
            <Navigation />
            
            <SearchBar 
                search={search} 
                onSearchChange={setSearch} 
            />

            <NoteForm onAddNote={handleAddNote} />

            <div className="notes-grid">
                <NoteList 
                    notes={filteredActive} 
                    title={`Catatan Aktif (${filteredActive.length})`} 
                    onDelete={handleDelete} 
                    onToggleArchive={handleToggleArchive} 
                />
                <NoteList 
                    notes={filteredArchived} 
                    title={`Arsip (${filteredArchived.length})`} 
                    onDelete={handleDelete} 
                    onToggleArchive={handleToggleArchive} 
                />
            </div>
        </div>
    );
}