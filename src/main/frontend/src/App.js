import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import ProductList from './ProductList';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input
    if (!firstName.trim() || !lastName.trim()) {
      setMessage('First name and last name cannot be blank.');
      return;
    }

    try {
      const response = await fetch('/hello/personalized', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        const errorMsg = await response.text();
        throw new Error(errorMsg || 'Network response was not ok');
      }

      const text = await response.text();
      setMessage(text);

      // Clear input fields
      setFirstName('');
      setLastName('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('There was an error processing your request: ' + error.message);
    }
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
          <button type="submit">Submit</button>
        </form>
        <p>{message}</p>
        {/* Removed the Router here */}
      </div>
  );
}

export default App;
