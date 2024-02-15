import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import Login from './Pages/LoginPage';
import Signup from './Pages/SignupPage';
import Bookings from './Pages/BookingsPage';
import Profile from './Pages/ProfilePage';
import FlightBooking from './Pages/FlightBooking';
import ResetPassword from './Pages/ResetingPassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/flightbooking" element={<FlightBooking />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
