import React from 'react';
import '../styles/searchbar.css';

export default function SearchBar({ search, onSearchChange }) {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <svg 
                    className="search-icon" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                >
                    <circle cx="11" cy="11" r="8" strokeWidth="2"/>
                    <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                    type="text"
                    placeholder="Cari berdasarkan judul catatan..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="search-input"
                />
                {search && (
                    <button 
                        className="search-clear"
                        onClick={() => onSearchChange('')}
                        aria-label="Clear search"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                )}
            </div>
            {search && (
                <p className="search-info">
                    Mencari: <span className="search-query">"{search}"</span>
                </p>
            )}
        </div>
    );
}