import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './App.css'; // Import the CSS file for styling

function App() {
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState(''); // State for last name
  const [message, setMessage] = useState(''); // State for message

  const navigate = useNavigate(); // Initialize navigate function

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const response = await fetch('/hello/personalized', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, lastName }), // Use state variables
    });

    const text = await response.text();
    setMessage(text); // Update message with response
  };

  // Function to navigate to Page 2
  const navigateToPage2 = () => {
    navigate('/page2');
  };

  return (
      <div className="App">
        <h1>Personalized Greeting</h1> {/* Page header */}
        <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)} // Update state on change
              required
          />
          <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)} // Update state on change
              required
          />
          <button type="submit">Submit</button> {/* Submit button */}
        </form>
        <p>{message}</p> {/* Display the message */}
        <button onClick={navigateToPage2}>Page 2</button> {/* Navigation button */}
      </div>
  );
}

export default App; // Export the App component
