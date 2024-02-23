import React, { useState } from "react";
import "../Css/FlightBooking.css";
import Navbar from "../Layout/Navbar";

export default function Bookings() {
  const [form, setForm] = useState({
    destination: "",
  });
  const [flights, setFlights] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error.message);
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
        <button type="submit" className="BookFlight-buttonn">
          Search Flights
        </button>
      </form>
      <div className="flight-results">
        <h2>Flight Results</h2>
        <table className="flight-table">
          <thead>
            <tr>
              <th>Airline</th>
              <th>Destinaton</th>
              <th>Departure Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.airline}</td>
                <td>{flight.destination}</td>
                <td>{flight.departure_datetime}</td>
                <td>${flight.price}</td>
                <td>
                  <button className="book-button">Book</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
