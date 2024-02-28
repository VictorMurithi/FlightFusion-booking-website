import React, { useState, useEffect } from "react";
import "../Css/FlightBooking.css";
import Navbar from "../Layout/Navbar";
import { useNavigate, useLocation } from "react-router-dom";

export default function Bookings() {
  const [form, setForm] = useState({
    destination: "",
  });
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destination = params.get("destination");
    if (destination) {
      setForm({ destination });
      fetchFlights(destination);
    }
  }, [location.search]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchFlights(form.destination);
  };

  const fetchFlights = async (destination) => {
    try {
      const response = await fetch("/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ destination }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      const data = await response.json();
      console.log("Flight data:", data); // Log flight data to console
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error.message);
    }
  };

  const addFlightToBookings = async (flightId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('/bookings/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ flight_id: flightId })
        });
        if (!response.ok) {
            throw new Error('Failed to add flight to bookings');
        }
    } catch (error) {
        console.error('Error adding flight to bookings:', error.message);
    }
  };

  return (
    <div className="Bookingss">
      <Navbar />
      <h1>Book a flight with us</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="destination">Destination</label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
        </div>
        <div className="sbutton">
        <button type="submit" className="SearchFlight-buttonn">
          Search Flights
        </button>
        </div>


       
      </form>
      <div className="flight-results">
        <h2>Flight Results</h2>
        <table className="flight-table">
          <thead>
            <tr>
              <th>Airline</th>
              <th>Destination</th>
              <th>Departure Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {flights.length > 0 ? (
    flights.map((flight) => (
      <tr key={flight.id}>
        <td>{flight.airline}</td>
        <td>{flight.destination}</td>
        <td>{flight.departure_datetime}</td>
        <td>${flight.price}</td>
        <td>
        <button className="book-button" onClick={() => addFlightToBookings(flight.id)}>Book</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No flights available</td>
    </tr>
  )}
</tbody>

        </table>
      </div>
    </div>
  );
}
