import React, { useState } from 'react';
import axios from 'axios';
import { registerDocument } from './BlockchainService'; // Import the registerDocument function
import './index.css'; // Import the CSS file

const SubmitDocument = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(''); // Προσθήκη για τίτλο
  const [description, setDescription] = useState(''); // Προσθήκη για περιγραφή
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false); // Νέα μεταβλητή για να δούμε αν υπήρξε επιτυχία
  const [loading, setLoading] = useState(false); // Νέα μεταβλητή για εμφάνιση του "Loading"

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Εμφάνιση του Loading

    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem('user')); // Ανάκτηση του χρήστη από το localStorage
    const candidateId = user?.ID; // Λήψη του candidate ID από τον χρήστη

    if (!candidateId) {
      setMessage('Candidate ID is not available. Please log in again.');
      setLoading(false);
      return;
    }

    formData.append('file', file);
    formData.append('candidate_id', candidateId); // Αποστολή candidate ID
    formData.append('title', title); // Αποστολή τίτλου
    formData.append('description', description); // Αποστολή περιγραφής

    try {
      const response = await axios.post('http://myproject.local/sumbitDocument.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        await registerDocument(title, description); // Χρησιμοποιείστε τον τίτλο και την περιγραφή
        setMessage('File successfully submitted!');
        setSuccess(true);
        setLoading(false); // Απόκρυψη του Loading

        setTimeout(() => {
          window.location.reload(); // Ανανεώστε τη σελίδα
        }, 3000);
      } else {
        setMessage(response.data.message || 'File upload failed');
        setLoading(false); // Απόκρυψη του Loading
      }
    } catch (error) {
      setMessage('Error uploading file: ' + (error.response?.data?.message || error.message));
      setLoading(false); // Απόκρυψη του Loading
    }
  };

  return (
    <div className="submit-container">
      <h1 className="form-title">Upload File</h1>
      {loading && <div className="loading-overlay">Loading...</div>} {/* Εμφάνιση του loading */}
      <form onSubmit={handleSubmit} className="submit-form">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="text"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-field"
          required
        />
        <input type="file" onChange={handleFileChange} className="file-input" required />
        <button type="submit" className="submit-button">Upload</button>
      </form>

      {message && <p className="message">{message}</p>} {/* Εμφάνιση μηνύματος */}

      {success && (
        <div className="success-message">
          <p>File successfully submitted! Click here to upload another file.</p>
          <button onClick={() => window.location.reload()} className="another-file-button">Upload Another File</button>
        </div>
      )}
        
    </div>
    
  );
};

export default SubmitDocument;
