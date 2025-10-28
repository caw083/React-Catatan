import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

export default function Navigation() {
    const location = useLocation();

    return (
        <header className="app-header">
            <div className="header-content">
                <Link to="/" className="header-link">
                    <h1 className="app-title">Aplikasi Catatan Pribadi</h1>
                    <p className="app-subtitle">Futuristic Notes Management System</p>
                </Link>
            </div>
            
            <nav className="header-nav">
                <Link 
                    to="/" 
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 22V12h6v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Catatan Aktif
                </Link>
                <Link 
                    to="/archives" 
                    className={`nav-link ${location.pathname === '/archives' ? 'active' : ''}`}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Arsip
                </Link>
                <Link 
                    to="/notes/new" 
                    className={`nav-link ${location.pathname === '/notes/new' ? 'active' : ''}`}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Tambah Catatan
                </Link>
            </nav>
            
            <div className="header-decoration">
                <span className="decoration-dot"></span>
                <span className="decoration-line"></span>
                <span className="decoration-dot"></span>
            </div>
        </header>
    );
}