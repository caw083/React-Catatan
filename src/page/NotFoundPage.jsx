import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/notfound.css';

export default function NotFoundPage() {
    return (
        <div className="notfound-container">
            <div className="notfound-content">
                <div className="notfound-code">404</div>
                <h1 className="notfound-title">Halaman Tidak Ditemukan</h1>
                <p className="notfound-description">
                    Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
                </p>
                <div className="notfound-actions">
                    <Link to="/" className="notfound-btn primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22V12h6v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Kembali ke Beranda
                    </Link>
                    <Link to="/archives" className="notfound-btn secondary">
                        Lihat Arsip
                    </Link>
                </div>
            </div>
            
            <div className="notfound-decoration">
                <div className="floating-dot"></div>
                <div className="floating-dot"></div>
                <div className="floating-dot"></div>
            </div>
        </div>
    );
}