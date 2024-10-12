import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Page2 from './Page2';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Create a root element for React
const root = ReactDOM.createRoot(document.getElementById('root')); // Fixed here

// Render the application
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/page2" element={<Page2 />} />
                {/* You can add more pages by adding more Route elements here! */}
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
