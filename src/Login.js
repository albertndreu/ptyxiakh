import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [name, setName] = useState('');
  const [afm, setAfm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Έλεγχος αν ο χρήστης είναι ήδη συνδεδεμένος
    const user = localStorage.getItem('user');
    if (user) {
      alert('Είστε ήδη συνδεδεμένος.');
      navigate('/'); // Redirect στον Home
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !afm) {
      setErrorMessage('Παρακαλώ συμπληρώστε και τα δύο πεδία.');
      return;
    }
    const formData = { name, afm };
    console.log("Submitting form with:", formData);
    try {
      const response = await axios.post('http://myproject.local/Login.php', formData, {
        withCredentials: true,
      });
      console.log('Response data:', response.data);
      if (response.data.success) {
        // Αποθήκευση των στοιχείων του χρήστη στο localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/Profile'); // Redirect στο Profile
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessage('Παρουσιάστηκε σφάλμα κατά τη σύνδεση.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Σύνδεση</h1>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <input
          type="text"
          placeholder="Όνομα Χρήστη"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="ΑΦΜ"
          value={afm}
          onChange={(e) => setAfm(e.target.value)}
          required
        />
        <button type="submit">Σύνδεση</button>
        <p>
          Δεν έχετε λογαριασμό; <a href="/RegisterCandidate">Εγγραφή εδώ</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
