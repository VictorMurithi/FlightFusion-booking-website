import React, { useState } from "react";
import "../Css/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password must match");
      return;
    }

    // Here you can implement your logic to handle the change password functionality
    // For example, you can update the password in the database
    // This is a placeholder message to indicate the password was changed
    setMessage(`Password for ${email} has been changed`);

    // Reset the form fields
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <div className="Overall-container">
    <div className="forgot-password-container">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div> */}
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
