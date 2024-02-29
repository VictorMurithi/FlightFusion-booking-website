import React, { useState, useEffect } from "react";
import "../Css/Profile.css";
import swal from "sweetalert";

const url = "https://flightfusion-booking-website.onrender.com";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: ""
  });
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${url}/user`, {
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

  const handleSave = async () => {
    try {
      const response = await fetch(`${url}/user`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(editedData)
      });
      if (response.ok) {
        setUserData({ ...editedData });
        setIsEditing(false);
        swal("Success!", "Profile updated successfully", "success");
      } else {
        swal("Error!", "Failed to update profile", "error");
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("An error occurred while updating profile:", error);
    }
  };

  const handleInputChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value
    });
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await fetch(`${url}/user`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      if (response.ok) {
        swal("Success!", "Profile deleted successfully", "success");
      } else {
        swal("Error!", "Failed to delete profile", "error");
        console.error("Failed to delete profile");
      }
    } catch (error) {
      console.error("An error occurred while deleting profile:", error);
    }
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
                title="Select an imageffff" // Custom title
              />
            </div>
          </div>
          <div className="profile-details">
            <div className="detail">
              <label>User Name:</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.username}
                  onChange={(e) => handleInputChange(e, "username")}
                />
              ) : (
                <span>{userData.username}</span>
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
                <span>{userData.phone}</span>
              )}
            </div>
            {isEditing ? (
              <>
                <button onClick={handleSave} className="save-btn">
                  Save
                </button>
                <button onClick={() => setIsEditing(false)} className="cancel-btn">
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className="edit-btn">
                Edit
              </button>
            )}
            {!isEditing && (
              <button onClick={handleDeleteProfile} className="delete-btn">
                Delete Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
