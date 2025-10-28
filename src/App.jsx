import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/app.css';

import { getInitialData } from './utils';
import Navigation from './component/navigation';
import HomePage from './page/HomePage';
import ArchivePage from './page/ArchievePage';
import DetailPage from './page/DetailPage';
import AddNotePage from './page/AddNotePage';
import NotFoundPage from './page/NotFoundPage';
// Context untuk sharing state
export const NotesContext = React.createContext();

export default function App() {
    const [notes, setNotes] = useState(getInitialData());

    const handleAddNote = ({ title, body }) => {
        const newNote = {
            id: `notes-${+new Date()}`,
            title,
            body,
            archived: false,
            createdAt: new Date().toISOString(),
        };
        setNotes((prev) => [newNote, ...prev]);
    };

    const handleDelete = (id) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const handleToggleArchive = (id) => {
        setNotes((prev) => prev.map((n) => n.id === id ? {...n, archived: !n.archived} : n));
    };

    const contextValue = {
        notes,
        handleAddNote,
        handleDelete,
        handleToggleArchive,
    };

    return (
        <NotesContext.Provider value={contextValue}>
            <Router>
                <div className="app-container">
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/archives" element={<ArchivePage />} />
                        <Route path="/notes/new" element={<AddNotePage />} />
                        <Route path="/notes/:id" element={<DetailPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </Router>
        </NotesContext.Provider>
    );
}