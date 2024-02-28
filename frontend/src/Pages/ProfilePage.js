import React, { useState } from "react";
import "../Css/Profile.css";

export default function Profile() {
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    userName: "John",
    email: "johndoe@gmail.com",
    phoneNumber: "0712345678"
  });
  const [editedData, setEditedData] = useState({});

<<<<<<< HEAD
=======
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch("/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error);
    }
  };

>>>>>>> 2ea7061 (Patch and delete crud operations)
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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleSave = () => {
    setIsEditing(false);
    // You can add logic here to save the edited data to the backend
    setUserData({ ...editedData });
  };

  const handleInputChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value
    });
  };

<<<<<<< HEAD
=======
  const handleDeleteProfile = async () => {
    try {
      const response = await fetch("/user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.ok) {
        alert("Profile deleted successfully");
        console.log("Profile deleted successfully");
      } else {
        console.error("Failed to delete profile");
      }
    } catch (error) {
      console.error("An error occurred while deleting profile:", error);
    }
  };

>>>>>>> 2ea7061 (Patch and delete crud operations)
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
              {isEditing ? (
                <input
                  type="text"
<<<<<<< HEAD
                  value={editedData.userName}
                  onChange={(e) => handleInputChange(e, "userName")}
=======
                  value={editedData.username}
                  onChange={(e) => handleInputChange(e, "username")}
>>>>>>> 2ea7061 (Patch and delete crud operations)
                />
              ) : (
                <span>{userData.userName}</span>
              )}
            </div>
            <div className="detail">
              <label>Email:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                />
              ) : (
                <span>{userData.email}</span>
              )}
            </div>
            <div className="detail">
              <label>Phone Number:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.phone}
                  onChange={(e) => handleInputChange(e, "phone")}
                />
              ) : (
                <span>{userData.phoneNumber}</span>
              )}
            </div>
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEdit}>Edit</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
