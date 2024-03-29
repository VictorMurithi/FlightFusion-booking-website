import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import "../Css/Login.css";
import swal from 'sweetalert';

const url = "https://flightfusion-booking-website.onrender.com";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication token on page load
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      navigate("/"); // Redirect to home page if already authenticated
    }
  }, [setIsAuthenticated, navigate]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg === "Invalid credentials") {
          swal("Error", data.msg, "error");
        } else {
          console.log("User logged in successfully", data);
          const successMessage = data.message || "Login successful";
          swal("Success", successMessage, "success");
          localStorage.setItem('token', data.access_token);
          setIsAuthenticated(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        swal("Error", "An error occurred while logging in", "error");
      });
  };

  return (
    <div className="login-image">
      <Navbar isAuthenticated={false}/>
      <div className="list2">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login">
          <div>
            <input
              type="text"
              value={email}
              placeholder="Email:"
              onChange={handleEmailChange}
              className="input-field"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password:"
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>
          <div className="button-container">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
          <div className="forgot-password">
            <p>
              <Link to="/forgotpassword">Forgot Password?</Link>
            </p>
          </div>
          <div className="Parag">
            <p>Don't have an account? </p>
            <Link to="/signup" className="signup-btn">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
