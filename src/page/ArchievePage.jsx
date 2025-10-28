import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { NotesContext } from '../app';
import SearchBar from '../component/searchbar';
import NoteList from '../component/notelist';

import '../styles/page.css'

export default function ArchivePage() {
    const { notes, handleDelete, handleToggleArchive } = useContext(NotesContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    const handleSearchChange = (value) => {
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    const filteredArchived = useMemo(() => {
        const archived = notes.filter((n) => n.archived);
        if (!search.trim()) return archived;
        const q = search.toLowerCase();
        return archived.filter((n) => n.title.toLowerCase().includes(q));
    }, [notes, search]);

    return (
        <div className="page-container">
            <SearchBar 
                search={search} 
                onSearchChange={handleSearchChange} 
            />

            <NoteList 
                notes={filteredArchived} 
                title={`Arsip (${filteredArchived.length})`} 
                onDelete={handleDelete} 
                onToggleArchive={handleToggleArchive}
                showLink={true}
                emptyMessage="Arsip kosong"
            />
        </div>
    );
}