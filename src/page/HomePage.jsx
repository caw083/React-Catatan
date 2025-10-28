import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../component/searchbar';
import NoteList from '../component/notelist';
import { 
    getActiveNotes, 
    deleteNote, 
    archiveNote,
} from '../utils/api';

import '../styles/page.css';

export default function HomePage() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setIsLoading(true);
        const { error, data } = await getActiveNotes();
        
        if (!error) {
            setNotes(data);
        }
        
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        const { error } = await deleteNote(id);
        
        if (!error) {
            // Hapus dari state lokal
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    const handleToggleArchive = async (id) => {
        const { error } = await archiveNote(id);
        
        if (!error) {
            // Hapus dari state lokal karena sudah diarsipkan
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    const handleSearchChange = (value) => {
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    // Filter notes by search query
    const filteredNotes = useMemo(() => {
        if (!search.trim()) return notes;
        const q = search.toLowerCase();
        return notes.filter((n) => n.title.toLowerCase().includes(q));
    }, [notes, search]);

    if (isLoading) {
        return (
            <div className="page-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Memuat catatan...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <SearchBar 
                search={search} 
                onSearchChange={handleSearchChange} 
            />

            <NoteList 
                notes={filteredNotes} 
                title={`Catatan Aktif (${filteredNotes.length})`} 
                onDelete={handleDelete} 
                onToggleArchive={handleToggleArchive}
                showLink={true}
                emptyMessage="Belum ada catatan. Yuk buat catatan pertamamu!"
            />
        </div>
    );
}