import React, { useState, useEffect, useMemo } from 'react';
import '../styles/app.css';
import Navigation from '../component/navigation';
import SearchBar from '../component/searchbar';
import NoteForm from '../component/noteform';
import NoteList from '../component/notelist';
import { 
    getActiveNotes, 
    getArchivedNotes, 
    addNote, 
    deleteNote, 
    archiveNote, 
    unarchiveNote 
} from '../utils/api';

export default function HomePage({ user, onLogout }) {
    const [activeNotes, setActiveNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    // Fetch notes on mount
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setIsLoading(true);
        
        const [activeResult, archivedResult] = await Promise.all([
            getActiveNotes(),
            getArchivedNotes(),
        ]);

        if (!activeResult.error) {
            setActiveNotes(activeResult.data);
        }

        if (!archivedResult.error) {
            setArchivedNotes(archivedResult.data);
        }

        setIsLoading(false);
    };

    const handleAddNote = async ({ title, body }) => {
        const { error } = await addNote({ title, body });
        
        if (!error) {
            fetchNotes(); // Refresh notes list
        }
    };

    const handleDelete = async (id) => {
        const { error } = await deleteNote(id);
        
        if (!error) {
            fetchNotes(); // Refresh notes list
        }
    };

    const handleToggleArchive = async (id, isArchived) => {
        const { error } = isArchived 
            ? await unarchiveNote(id) 
            : await archiveNote(id);
        
        if (!error) {
            fetchNotes(); // Refresh notes list
        }
    };

    // Filter notes by search query
    const filteredActive = useMemo(() => {
        if (!search.trim()) return activeNotes;
        const q = search.toLowerCase();
        return activeNotes.filter((n) => n.title.toLowerCase().includes(q));
    }, [activeNotes, search]);

    const filteredArchived = useMemo(() => {
        if (!search.trim()) return archivedNotes;
        const q = search.toLowerCase();
        return archivedNotes.filter((n) => n.title.toLowerCase().includes(q));
    }, [archivedNotes, search]);

    if (isLoading) {
        return (
            <div className="app-container">
                <Navigation user={user} onLogout={onLogout} />
                <div className="loading-container">
                    <p className="loading-text">Memuat catatan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="app-container">
            
            <SearchBar 
                search={search} 
                onSearchChange={setSearch} 
            />


            <div className="notes-grid">
                <NoteList 
                    notes={filteredActive} 
                    title={`Catatan Aktif (${filteredActive.length})`} 
                    onDelete={handleDelete} 
                    onToggleArchive={handleToggleArchive} 
                />
             
            </div>
        </div>
    );
}