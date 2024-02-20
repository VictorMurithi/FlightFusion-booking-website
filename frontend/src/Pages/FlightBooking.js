import React, { useState } from "react";
import "../Css/FlightBooking.css";
import Navbar from "../Layout/Navbar";

export default function Bookings() {
  const [form, setForm] = useState({
    airport: "",
    destination: "",
    flightDate: "",
    departureTime: "",
    tripType: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Here you would typically send the form data to your server
  };

  return (
    <div className="Bookingss">
      <Navbar />
      <h1>Book a flight with us</h1>
      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-row">
          <div className="form-group-">
            <label htmlFor="destination">Destination</label>
            <select
              name="destination"
              value={form.destination}
              onChange={handleChange}
              className="custom-select" // Apply custom CSS class

            >
              <option value="">Select Destination</option>
              <option value="London">London</option>
              <option value="Paris">Paris</option>
              <option value="New York">New York</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="flightDate">Flight Date</label>
            <input
              type="date"
              name="flightDate"
              value={form.flightDate}
              onChange={handleChange}
              className="custom-date-input" // Apply custom CSS class

            />
          </div>
        </div>
        {/* <button type="submit" className='BookFlight-buttonn'>Book Flight</button> */}
      </form>
      <div className="flight-results">
        {/* <h2>Flight Results</h2> */}
        <table className="flight-table">
        {/* <h2>Flight Results</h2> */}
          <thead>
            <tr>
                
              <th>Airline</th>
              <th>Flight Date</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>

          </thead>
          <tbody>
            <tr>
              <td>Spirit</td>
              <td>11/11/2024</td>
              <td>4:20 AM</td>
              <td>4:20 PM</td>
              <td>$200</td>
              <td>
                <button className="book-button">Book</button>
              </td>
            </tr>
            <tr>
              <td>Delta</td>
              <td>11/12/2024</td>
              <td>6:00 AM</td>
              <td>8:30 PM</td>
              <td>$250</td>
              <td>
                <button className="book-button">Book</button>
              </td>
            </tr>
            <tr>
              <td>United</td>
              <td>11/13/2024</td>
              <td>9:00 AM</td>
              <td>11:30 PM</td>
              <td>$280</td>
              <td>
                <button className="book-button">Book</button>
              </td>
            </tr>
            <tr>
              <td>Spirit</td>
              <td>11/11/2024</td>
              <td>4:20 AM</td>
              <td>4:20 PM</td>
              <td>$200</td>
              <td>
                <button className="book-button">Book</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
