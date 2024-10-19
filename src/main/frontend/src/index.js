import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from './Cart'; // Import Cart component
import Home from './Home'; // Import Home component
import Navbar from './Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Create a root element for React
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> {/* Home page */}
                <Route path="/register" element={<App />} /> {/* Registration page */}
                <Route path="/cart" element={<Cart />} /> {/* Cart page */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
