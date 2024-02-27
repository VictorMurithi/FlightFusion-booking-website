import React, { useState, useEffect } from 'react';
import '../Css/Bookings.css';
import Navbar from '../Layout/Navbar';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/bookings', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error.message);
      }
    };

    fetchBookings();
  }, []);

  const cancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      setBookings(bookings.filter(booking => booking.id !== bookingId));
    } catch (error) {
      console.error('Error canceling booking:', error.message);
    }
  };

  return (
    <div className="Bookingsss">
      <Navbar />
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
                  <button className="remove-button" onClick={() => cancelBooking(booking.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
