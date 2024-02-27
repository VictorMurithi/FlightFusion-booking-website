import React, { useState } from "react";
import "../Css/Profile.css";

export default function Profile() {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setImage(null);
  };

  return (
    <div className="profile-container">
      <div className="profile-2">
        <h1>My Profile</h1>
        <div className="profile-content">
          <div className="profile-picture-container">
            <div
              className="profile-picture"
              style={{ backgroundImage: `url(${image})` }}
            >
              {image && (
                <div className="button-container">
                  <button
                    onClick={handleRemovePhoto}
                    className="remove-photo-button"
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              )}
            </div>
            <div className="buttonn-container">
              <input
                type="file"
                className="button-profile"
                onChange={handleImageChange}
                accept="image/*"
                
              />
            </div>
          </div>
          <div className="profile-details">
            <div className="detail">
              <label>User Name:</label>
              <span>John </span>
              {/* Add your edit icon here */}
            </div>
            <div className="detail">
              <label>Email:</label>
              <span>johndoe@gmail.com</span>
              {/* Add your edit icon here */}
            </div>
            <div className="detail">
              <label>Phone Number:</label>
              <span>0712345678</span>
              {/* Add your edit icon here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
