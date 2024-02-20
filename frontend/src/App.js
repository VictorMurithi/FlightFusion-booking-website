import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import Login from './Pages/LoginPage';
import Signup from './Pages/SignupPage';
import Bookings from './Pages/BookingsPage';
import Profile from './Pages/ProfilePage';
import FlightBooking from './Pages/FlightBooking';
import ResetPassword from './Pages/ResetingPassword';
import ForgotPassword from './Pages/ForgotPassword';
import Navbar from './Layout/Navbar';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/flightbooking" element={<FlightBooking />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
