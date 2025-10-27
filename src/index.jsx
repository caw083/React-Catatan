import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app'; // ✅ impor komponen utama

const root = createRoot(document.getElementById('root'));
root.render(<App />); // ✅ render komponen App, bukan <h1>
