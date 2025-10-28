import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/app.css';

import { getUserLogged, putAccessToken, getAccessToken } from './utils/api';
import Navigation from './component/navigation';
import HomePage from './page/HomePage';
import ArchivePage from './page/ArchievePage';
import DetailPage from './page/DetailPage';
import AddNotePage from './page/AddNotePage';
import NotFoundPage from './page/NotFoundPage';
import LoginPage from './page/loginPage';
import RegisterPage from './page/registerPage';

// Context untuk sharing state
export const AuthContext = React.createContext();

export default function App() {
    const [authedUser, setAuthedUser] = useState(null);
    const [initializing, setInitializing] = useState(true);

    useEffect(() => {
        // Cek apakah user sudah login
        const checkAuth = async () => {
            const token = getAccessToken();
            if (token) {
                const { error, data } = await getUserLogged();
                if (!error) {
                    setAuthedUser(data);
                }
            }
            setInitializing(false);
        };

        checkAuth();
    }, []);

    const onLoginSuccess = async ({ accessToken }) => {
        putAccessToken(accessToken);
        const { data } = await getUserLogged();
        setAuthedUser(data);
    };

    const onLogout = () => {
        setAuthedUser(null);
        putAccessToken('');
    };

    if (initializing) {
        return (
            <div className="app-container loading-container">
                <div className="loading-text">
                    <div className="loading-spinner"></div>
                    <p>Memuat aplikasi...</p>
                </div>
            </div>
        );
    }

    const authContextValue = {
        authedUser,
        onLoginSuccess,
        onLogout
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            <Router>
                <div className="app-container">
                    {!authedUser ? (
                        // Jika belum login, tampilkan halaman auth
                        <Routes>
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </Routes>
                    ) : (
                        // Jika sudah login, tampilkan aplikasi
                        <>
                            <Navigation />
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/archives" element={<ArchivePage />} />
                                <Route path="/notes/new" element={<AddNotePage />} />
                                <Route path="/notes/:id" element={<DetailPage />} />
                                <Route path="*" element={<NotFoundPage />} />
                            </Routes>
                        </>
                    )}
                </div>
            </Router>
        </AuthContext.Provider>
    );
}