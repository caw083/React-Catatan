import React, { useState } from 'react';
import '../styles/noteform.css';

const MAX_TITLE = 50;

export default function NoteForm({ onAddNote }) {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const remaining = MAX_TITLE - title.length;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === '' || body.trim() === '') return;

        onAddNote({ title: title.trim(), body: body.trim() });
        setTitle('');
        setBody('');
    }

    const handleTitleChange = (e) => {
        const val = e.target.value;
        // Limit menggunakan state (bukan atribut maxlength)
        if (val.length <= MAX_TITLE) setTitle(val);
    }

    return (
        <form onSubmit={handleSubmit} className="note-form-container">
            <h3>Buat Catatan</h3>
            <div className="form-group">
                <label className="form-label">
                    Judul (<span className="char-counter">{remaining}</span> tersisa)
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Judul catatan"
                        className="form-input"
                    />
                </label>
            </div>
            <div className="form-group">
                <label className="form-label">
                    Isi
                    <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Isi catatan"
                        rows={4}
                        className="form-textarea"
                    />
                </label>
            </div>
            <button type="submit" className="submit-btn">Simpan</button>
        </form>
    )
}