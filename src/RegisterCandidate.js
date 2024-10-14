import React, { useState } from 'react';
import { registerCandidate } from './BlockchainService'; // Import your blockchain service

const RegisterCandidate = () => {
  const [name, setName] = useState('');
  const [fathersname, setFathersname] = useState('');
  const [lastname, setLastname] = useState('');
  const [imageHash, setImageHash] = useState('');
  const [afm, setAfm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the function to register the candidate
    await registerCandidate(name, fathersname, lastname, imageHash, afm);

    // Send the data to your PHP backend
    console.log('Sending data to PHP:', { name, fathersname, lastname, imageHash, afm });

    const response = await fetch('http://myproject.local/registerCandidate.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, fathersname, lastname, imageHash, afm }),
    });

     const data = await response.json(); // Parse the JSON response

    if (data.success) {
      console.log('Data sent to PHP successfully');
    } else {
      console.error('Error sending data to PHP:', data.error); // Log the error
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        name="fathersname"
        value={fathersname}
        onChange={(e) => setFathersname(e.target.value)}
        required
      />
      <input
        type="text"
        name="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
      />
      <input
        type="text"
        name="imageHash"
        value={imageHash}
        onChange={(e) => setImageHash(e.target.value)}
        required
      />
      <input
        type="number"
        name="afm"
        value={afm}
        onChange={(e) => setAfm(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterCandidate;
