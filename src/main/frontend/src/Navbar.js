import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
/**
 * Navigation bar component that provides links to different pages of the application.
 * Includes links to the home, products, cart, register, and inventory management sections.
 */

const Navbar = () => {
    return (
        <nav className="navbar">
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopping_cart_icon.svg/2048px-Shopping_cart_icon.svg.png"
                alt="Store Logo"
                className="logo"
            />
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/Items">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/manage-inventory">Inventory</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
