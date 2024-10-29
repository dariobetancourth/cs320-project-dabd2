import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import Cart from './Cart';
import './App.css';

function App() {
  const [persons, setPersons] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);

  // Fetch all persons on component mount
  const fetchPersons = async () => {
    try {
      const response = await fetch('/hello');
      const data = await response.json();
      setPersons(data);
    } catch (error) {
      console.error('Error fetching persons:', error);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  // Handle form submission for creating/updating a person
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim()) {
      setMessage('First name and last name cannot be blank.');
      return;
    }

    try {
      const response = editId
          ? await fetch(`/hello/${editId}`, { // Update
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName }),
          })
          : await fetch('/hello/personalized', { // Create
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName }),
          });

      if (!response.ok) throw new Error(await response.text());

      setMessage(editId ? 'Person updated successfully!' : 'Person added successfully!');
      fetchPersons(); // Refresh the list
      setFirstName('');
      setLastName('');
      setEditId(null); // Reset the edit state
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  // Delete person
  const deletePerson = async (id) => {
    try {
      await fetch(`/hello/${id}`, { method: 'DELETE' });
      setMessage('Person deleted successfully!');
      fetchPersons(); // Refresh the list
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  // Set form fields for editing
  const handleEdit = (person) => {
    setEditId(person.id);
    const [first, last] = person.name.split(" ");
    setFirstName(first);
    setLastName(last || ''); // In case there was no last name
  };

  return (
      <div className="App">
        <h1>Register Today for Discounts</h1>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">{editId ? 'Update Person' : 'Submit'}</button>
        </form>
        <p>{message}</p>

        <h2>Persons List</h2>
        <ul className="person-list">
          {persons.map((person) => (
              <li key={person.id} className="person-item">
                {person.name}
                <button onClick={() => handleEdit(person)}>Edit</button>
                <button onClick={() => deletePerson(person.id)}>Delete</button>
              </li>
          ))}
        </ul>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
  );
}

export default App;
