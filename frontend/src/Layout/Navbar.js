import react from "react";
import { Link } from "react-router-dom";
import "../Css/Navbar.css";
import logo from '../img/airplanetakeoff.png'

export default function Navbar() {
    return (
        // <div className="Navbar">
        //     <Link to="/">Home</Link>
        //     <Link to="/bookings">Bookings</Link>
        //     <Link to="/login">Login</Link>/<Link to="/signup">Signup</Link>
        //     <Link to="/profile">Profile</Link>
        // </div>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand me-auto">
                    <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link to="/" className="nav-link active text-white" aria-current="page">Home</Link>
                        <Link to="/bookings" className="nav-link text-white">Bookings</Link>
                        <Link to="/login" className="nav-link text-white">Login</Link>
                        <Link to="/signup" className="nav-link text-white">Signup</Link>
                        <Link to="/profile" className="nav-link text-white">Profile</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}