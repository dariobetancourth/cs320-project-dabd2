/**
 * Root JavaScript file that initializes the React application and renders the App component into the DOM.
 * Sets up the root React environment and enables functionality like strict mode.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Cart from './Cart'; // Import Cart component
import Home from './Home'; // Import Home component
import Navbar from './Navbar';
import Items from "./Items";


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
                <Route path="/items" element={<Items />} /> {/* Cart page */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
