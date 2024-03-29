import React, { useState, useEffect } from 'react';
import '../Css/Bookings.css';
import swal from 'sweetalert';

const url = "https://flightfusion-booking-website.onrender.com";
const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${url}/bookings`, {
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
      const response = await fetch(`${url}/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      // Display SweetAlert for successful booking cancellation
      swal({
        title: "Success!",
        text: "Booking canceled successfully",
        icon: "success",
        button: "OK",
      });
    } catch (error) {
        console.error('Error canceling booking:', error.message);
    }
};


  return (
    <div className="Bookingsss">
      <div className="flight-resultsss">
        <h1>Current Bookings</h1>
        <table className="flight-tableee">
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure Date</th>
              <th>Booking Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.departure_datetime}</td> 
                <td>{booking.booking_datetime}</td>
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
