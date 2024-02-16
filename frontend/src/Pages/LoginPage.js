import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import "../Css/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data.role);

        navigate("/");
      } else if (response.status === 401) {
        const errorData = await response.json();
        console.error("Authentication error:", errorData.error);
        alert("User Not Found");
      } else {
        console.error("Unexpected error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="login-image">
      <Navbar />
      <div className="list">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login">
          <div>
            <input
              type="text"
              value={email}
              placeholder="Email:"
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password:"
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>

          <div className="button-container">
            {" "}
            {/* Container for buttons */}
            <button type="submit" className="login-button">
              Login
            </button>{" "}
            {/* Added login-button class */}
          </div>
          <div className="forgot-password">
            <p>
              <Link to="/forgotpassword">Forgot Password?</Link>
            </p>{" "}
            {/* Added forgot password link */}
          </div>

          <div className="Parag">
            {" "}
            {/* Container for "Don't have an account?" text and "Sign Up" button */}
            <p>Don't have an account? </p>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>{" "}
            {/* Added signup-button class */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;