// App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import Cart from './Cart';
import './App.css';
import { API_URL } from './config';


/**
 * Main entry point of the React application. Renders the primary components and sets up routing for different pages.
 * Manages application-wide state for user registration and inventory management.
 */

function App() {
    // State for the Register functionality
    const [persons, setPersons] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');
    const [editPersonId, setEditPersonId] = useState(null);

    // State for the Manage Inventory functionality
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [inventoryMessage, setInventoryMessage] = useState('');
    const [editItemId, setEditItemId] = useState(null);

    // Fetch all persons
    const fetchPersons = async () => {
        try {
            const response = await fetch('/hello');
            const data = await response.json();
            setPersons(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching persons:', error);
        }
    };

    // Fetch all items
    const fetchItems = async () => {
        try {
            const response = await fetch('/inventory');
            const data = await response.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchPersons();
        fetchItems();
    }, []);

    // Handle form submission for creating/updating a person
    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        if (!firstName.trim() || !lastName.trim()) {
            setRegisterMessage('First name and last name cannot be blank.');
            return;
        }

        try {
            const response = editPersonId
                ? await fetch(`/hello/${editPersonId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstName, lastName }),
                })
                : await fetch('/hello/personalized', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ firstName, lastName }),
                });

            if (!response.ok) throw new Error(await response.text());

            setRegisterMessage(editPersonId ? 'Person updated successfully!' : 'Person added successfully!');
            fetchPersons();
            setFirstName('');
            setLastName('');
            setEditPersonId(null);
        } catch (error) {
            setRegisterMessage('Error: ' + error.message);
        }
    };

    // Delete person
    const deletePerson = async (id) => {
        try {
            await fetch(`/hello/${id}`, { method: 'DELETE' });
            setRegisterMessage('Person deleted successfully!');
            fetchPersons();
        } catch (error) {
            console.error('Error deleting person:', error);
        }
    };

    // Set form fields for editing person
    const handleEditPerson = (person) => {
        setEditPersonId(person.id);
        setFirstName(person.firstName);
        setLastName(person.lastName);
    };

    // Handle form submission for creating/updating an item
    const handleInventorySubmit = async (event) => {
        event.preventDefault();
        if (!name.trim() || !price) {
            setInventoryMessage('Name and price are required.');
            return;
        }

        try {
            const response = editItemId
                ? await fetch(`/inventory/${editItemId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, price: parseFloat(price), description }),
                })
                : await fetch('/inventory', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, price: parseFloat(price), description }),
                });

            if (!response.ok) throw new Error(await response.text());

            setInventoryMessage(editItemId ? 'Item updated successfully!' : 'Item added successfully!');
            fetchItems();
            setName('');
            setPrice('');
            setDescription('');
            setEditItemId(null);
        } catch (error) {
            setInventoryMessage('Error: ' + error.message);
        }
    };

    // Delete item
    const deleteItem = async (id) => {
        try {
            await fetch(`/inventory/${id}`, { method: 'DELETE' });
            setInventoryMessage('Item deleted successfully!');
            fetchItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Set form fields for editing item
    const handleEditItem = (item) => {
        setEditItemId(item.id);
        setName(item.name);
        setPrice(item.price);
        setDescription(item.description);
    };

    return (
        <div className="App">
            {/* Register Section */}
            <h1>Register Page</h1>
            <form onSubmit={handleRegisterSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <button type="submit">{editPersonId ? 'Update' : 'Submit'}</button>
            </form>
            <p>{registerMessage}</p>

            <h2>Persons List</h2>
            <ul className="person-list">
                {persons.map((person) => (
                    <li key={person.id} className="person-item">
                        <span className="person-name">
                            {person.firstName} {person.lastName}
                        </span>
                        <div className="person-buttons">
                            <button onClick={() => handleEditPerson(person)}>Edit</button>
                            <button onClick={() => deletePerson(person.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Inventory Management Section */}
            <h1>Manage Inventory</h1>
            <form onSubmit={handleInventorySubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button type="submit">{editItemId ? 'Update Item' : 'Add Item'}</button>
            </form>
            <p>{inventoryMessage}</p>

            <h2>Inventory List</h2>
            <ul className="inventory-list">
                {items.map((item) => (
                    <li key={item.id} className="inventory-item">
                        <span className="inventory-name">
                            {item.name} - ${item.price} <br />
                            {item.description}
                        </span>
                        <div className="inventory-buttons">
                            <button onClick={() => handleEditItem(item)}>Edit</button>
                            <button onClick={() => deleteItem(item.id)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Routes for other pages */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/cart" element={<Cart />} />
            </Routes>
        </div>
    );
}

export default App;
