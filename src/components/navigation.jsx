import React from 'react';
import '../styles/navigation.css';


export default function Navigation() {
    return (
        <header className="app-header">
            <div className="header-content">
                <h1 className="app-title">Aplikasi Catatan Pribadi</h1>
                <p className="app-subtitle">Futuristic Notes Management System</p>
            </div>
            <div className="header-decoration">
                <span className="decoration-dot"></span>
                <span className="decoration-line"></span>
                <span className="decoration-dot"></span>
            </div>
        </header>
    );
}