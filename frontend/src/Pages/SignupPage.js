import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import "../Css/Signup.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Ensure phone number is 10 digits long
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Phone number must be 10 digits long and contain only numbers");
      return;
    }

    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setError(null);
          console.log("User registered successfully:", data);
          alert(data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
        setError("An error occurred while processing your request");
      });
  };

  return (
    <div className="signup-image">
      <Navbar />
      <div className="list">
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit} className="signup">
          {/* Display error message if exists */}
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={username}
            onChange={handleUsernameChange}
            required
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="input-field"
          />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="input-field"
          />
          <button type="submit" className="signup-button">
            SignUp
          </button>
        </form>
      </div>
    </div>
  );
}
