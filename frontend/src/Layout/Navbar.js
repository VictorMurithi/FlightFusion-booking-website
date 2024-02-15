import react from "react";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";

export default function Navbar() {
    return (
        <div className="Navbar">
            <Link to="/">Home</Link>
            <Link to="/bookings">Bookings</Link>
            <Link to="/login">Login</Link>/<Link to="/signup">Signup</Link>
            <Link to="/profile">Profile</Link>
        </div>
    );
}