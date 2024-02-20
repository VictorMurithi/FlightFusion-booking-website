import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import "../Css/Login.css";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    fetch("/login", {
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
        if (data.error) {
          setError(data.error);
        } else {
          setError(null);
          console.log("User logged in successfully", data);
          alert(data.message);
          setIsAuthenticated(true);
          navigate("/");
        }
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
