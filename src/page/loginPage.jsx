import React, { useState } from 'react';
import { login } from '../utils/api';
import '../styles/auth.css';

export default function LoginPage({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            alert('Email dan password harus diisi!');
            return;
        }

        setIsLoading(true);
        const { error, data } = await login({ email, password });
        setIsLoading(false);

        if (!error) {
            onLoginSuccess(data);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-header">
                    <h1 className="auth-title">Login</h1>
                    <p className="auth-subtitle">Masuk ke Aplikasi Catatan Pribadi</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
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
                            placeholder="masukkan password"
                            className="form-input"
                            disabled={isLoading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="auth-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Login'}
                    </button>
                </form>

                <p className="auth-link">
                    Belum punya akun? <a href="#register">Daftar di sini</a>
                </p>
            </div>
        </div>
    );
}