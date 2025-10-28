import React, { createContext, useState, useEffect } from 'react';
import { getUserLogged, putAccessToken, getAccessToken } from '../utils/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
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

    const value = {
        authedUser,
        onLoginSuccess,
        onLogout,
        initializing
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}