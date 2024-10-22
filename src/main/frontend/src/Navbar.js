import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

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
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;

