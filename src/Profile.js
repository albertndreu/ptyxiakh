import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null); // Για την εισαγωγή φωτογραφίας
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
    } else {
      setError('User not logged in.');
      navigate('/Login');
    }
  }, [navigate]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file)); // Προσωρινή προβολή της φωτογραφίας

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://myproject.local/uploadPhoto.php', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
      if (response.data.success) {
        // Ενημέρωση της εικόνας στο προφίλ
        setUserData((prevData) => ({ ...prevData, IMAGEHASH: response.data.imageHash }));
      }
    } catch (error) {
      console.error('Image upload failed:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="sidebar">
        <ul>
          <li><button onClick={() => navigate('/MyDocuments')}>View Files</button></li>
          <li><button onClick={() => { localStorage.removeItem('user'); navigate('/Login'); }}>Logout</button></li>
          <li><button onClick={() => navigate('/contactAdmin')}>Contact Admin</button></li>
          <li><button onClick={() => navigate('/deleteProfile')}>Delete Profile</button></li>
        </ul>
      </div>
      <div className="profile-content">
        {error && <p>{error}</p>}
        {userData ? (
          <div>
            <h1>Profile</h1>
            <p>Name: {userData.NAME}</p>
            <p>AFM: {userData.AFM}</p>
            <p>IMAGEHASH: {userData.IMAGEHASH || 'No image uploaded yet'}</p>
            <div className="image-upload">
              <img src={image || `http://myproject.local/images/${userData.IMAGEHASH}`} alt="User" />
              <input type="file" onChange={handleImageUpload} />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
