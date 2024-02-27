import React, { useState } from "react";
import "../Css/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match");
      return;
    }

    try {
      const response = await fetch("/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, new_password: newPassword }), // Include email field
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to change password");
      } else {
        setMessage(data.message || "Password updated successfully");
      }
    } catch (error) {
      setError("An error occurred while processing your request");
    }

    // Reset the form fields
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="Overall-container">
      <div className="forgot-password-container">
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="x1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="x1">New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="x1">Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button type="submit">Change Password</button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}
