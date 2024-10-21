import React, { useState } from 'react';
import { registerCandidate } from './BlockchainService'; // Import your blockchain service
import { useNavigate } from 'react-router-dom';

const RegisterCandidate = () => {
  const [name, setName] = useState('');
  const [fathersname, setFathersname] = useState('');
  const [lastname, setLastname] = useState('');
  const [imageHash, setImageHash] = useState('');
  const [afm, setAfm] = useState('');


  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Call the function to register the candidate
    await registerCandidate(name, fathersname, lastname, imageHash, afm);

    // Send the data to your PHP backend
    console.log('Sending data to PHP:', { name, fathersname, lastname, imageHash, afm });

   try {
  const response = await fetch('http://myproject.local/registerCandidate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, fathersname, lastname, imageHash, afm }),
  });

  // Check if the response is OK
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json(); // Parse the JSON response

  if (data.success) {
    console.log('Data sent to PHP successfully');
    
    setTimeout(() => {
      navigate('/LogIn'); // Redirect to home page after 3 seconds
    }, 3000);
  } else {
    console.error('Error sending data to PHP:', data.error); // Log the error
  }
} catch (error) {
  console.error('Error during fetch:', error);
}


  };


  return (
    <div className="register-container">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-message">Loading...</div>
        </div>
      )}
      {!loading && (
    <form className="register-form" onSubmit={handleSubmit}>
      {loading && <div>Loading...</div>} {/* Display loading message */}
      <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Father's Name"
            value={fathersname}
            onChange={(e) => setFathersname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter Image Hash"
            value={imageHash}
            onChange={(e) => setImageHash(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter AFM"
            value={afm}
            onChange={(e) => setAfm(e.target.value)}
            required
          />
          <button type="submit">Register</button>
    </form>
      )}
      
    </div>
    
  );
};

export default RegisterCandidate; 