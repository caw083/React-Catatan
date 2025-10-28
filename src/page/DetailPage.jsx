import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/api';
import { showFormattedDate } from '../utils';
import '../styles/detail.css';
import '../styles/page.css';

export default function DetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchNote();
    }, [id]);

    const fetchNote = async () => {
        setIsLoading(true);
        const { error, data } = await getNote(id);
        
        if (!error) {
            setNote(data);
        }
        
        setIsLoading(false);
    };

    const handleDelete = async () => {
        const confirm = window.confirm('Apakah Anda yakin ingin menghapus catatan ini?');
        if (!confirm) return;

        const { error } = await deleteNote(id);
        
        if (!error) {
            navigate('/');
        }
    };

    const handleArchive = async () => {
        if (note.archived) {
            const { error } = await unarchiveNote(id);
            if (!error) {
                navigate('/');
            }
        } else {
            const { error } = await archiveNote(id);
            if (!error) {
                navigate('/archives');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="detail-container">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Memuat detail catatan...</p>
                </div>
            </div>
        );
    }

    if (!note) {
        return (
            <div className="detail-container">
                <div className="not-found-message">
                    <h2>Catatan tidak ditemukan</h2>
                    <p>Catatan dengan ID "{id}" tidak ada.</p>
                    <Link to="/" className="back-btn">Kembali ke Beranda</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <div className="detail-header">
                <Link to={note.archived ? '/archives' : '/'} className="back-btn">
                    ← Kembali
                </Link>
            </div>

            <div className="detail-card">
                <div className="detail-title-section">
                    <h1 className="detail-title">{note.title}</h1>
                    <span className="detail-date">{showFormattedDate(note.createdAt)}</span>
                </div>

                <div className="detail-body">
                    <p>{note.body}</p>
                </div>

                <div className="detail-actions">
                    <button onClick={handleDelete} className="action-btn delete-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Hapus
                    </button>
                    <button onClick={handleArchive} className="action-btn archive-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            {note.archived ? (
                                <path d="M3 10h18M3 14h18M9 6h6M7 18h10a2 2 0 002-2V8a2 2 0 00-2-2H7a2 2 0 00-2 2v8a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            ) : (
                                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            )}
                        </svg>
                        {note.archived ? 'Pindahkan' : 'Arsipkan'}
                    </button>
                </div>
            </div>
        </div>
    );
}