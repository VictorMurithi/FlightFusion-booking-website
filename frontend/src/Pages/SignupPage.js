import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import "../Css/Signup.css";
// import img from '.';


export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // Added phone number state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;

      case "email":
        setEmail(value);
        break;

      case "phoneNumber":
        setPhoneNumber(value);
        break;

      case "password":
        setPassword(value);
        break;

      case "confirmPassword":
        setConfirmPassword(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Submit logic here
  };

  return (
    <div className="signup-image">
      <Navbar />
      <div className="list">
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit} className="signup">
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
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
