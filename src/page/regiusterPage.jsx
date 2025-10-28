import React, { useState } from 'react';
import { register } from '../utils/api';
import '../styles/auth.css';

export default function RegisterPage({ onRegisterSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!name || !email || !password) {
            alert('Semua field harus diisi!');
            return;
        }

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok!');
            return;
        }

        if (password.length < 6) {
            alert('Password minimal 6 karakter!');
            return;
        }

        setIsLoading(true);
        const { error } = await register({ name, email, password });
        setIsLoading(false);

        if (!error) {
            alert('Registrasi berhasil! Silakan login.');
            onRegisterSuccess();
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h1 className="auth-title">Daftar</h1>
                    <p className="auth-subtitle">Buat Akun Baru</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Nama</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="masukkan nama"
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="masukkan email"
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="minimal 6 karakter"
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Konfirmasi Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="ulangi password"
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Daftar'}
                    </button>
                </form>

                <p className="auth-link">
                    Sudah punya akun? <a href="#login">Login di sini</a>
                </p>
            </div>
        </div>
    );
}