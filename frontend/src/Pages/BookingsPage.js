import React, { useState } from "react";
import "../Css/Bookings.css";
import Navbar from "../Layout/Navbar";

export default function Bookings() {
  // Sample data for current bookings
  const [bookings, setBookings] = useState([
    { id: 1, airline: "Spirit", flightDate: "11/11/2024", departureTime: "4:20 AM", arrivalTime: "4:20 PM", price: "$200" },
    { id: 2, airline: "Delta", flightDate: "11/12/2024", departureTime: "6:00 AM", arrivalTime: "8:30 PM", price: "$250" },
    { id: 3, airline: "United", flightDate: "11/13/2024", departureTime: "9:00 AM", arrivalTime: "11:30 PM", price: "$280" },
  ]);

  return (
    <div className="Bookingsss">
      <Navbar />
        {/* <h1>Current Bookings</h1>   */}
      <div className="flight-resultsss">
      <h1>Current Bookings</h1>  
        <table className="flight-tableee">
            
          <thead>
            <tr>
              <th>ID</th>
              <th>Airline</th>
              <th>Flight Date</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.airline}</td>
                <td>{booking.flightDate}</td>
                <td>{booking.departureTime}</td>
                <td>{booking.arrivalTime}</td>
                <td>{booking.price}</td>
                <td>
                  <button className="remove-button">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}