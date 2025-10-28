import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../component/searchbar';
import NoteList from '../component/notelist';
import { 
    getArchivedNotes, 
    deleteNote, 
    unarchiveNote,
} from '../utils/api';

import '../styles/page.css';

export default function ArchivePage() {
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        setIsLoading(true);
        const { error, data } = await getArchivedNotes();
        
        if (!error) {
            setNotes(data);
        }
        
        setIsLoading(false);
    };

    const handleDelete = async (id) => {
        const { error } = await deleteNote(id);
        
        if (!error) {
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    const handleToggleArchive = async (id) => {
        const { error } = await unarchiveNote(id);
        
        if (!error) {
            // Hapus dari state lokal karena sudah di-unarchive
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
                    <p className="loading-text">Memuat arsip...</p>
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
                title={`Arsip (${filteredNotes.length})`} 
                onDelete={handleDelete} 
                onToggleArchive={handleToggleArchive}
                showLink={true}
                emptyMessage="Arsip kosong"
            />
        </div>
    );
}