import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
    return (
        <nav>
            <div>

            <Link to="/">Home</Link>
            <span> | </span> {/* This creates a space between the links */}
            <Link to="/page2">Page 2</Link>
            </div>

        </nav>
    );
}

export default Navbar;
