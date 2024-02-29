import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img1 from '../img/g1.png';
import img2 from '../img/g2.png';
import img3 from '../img/g3.png';
import img4 from '../img/g4.png';
import img5 from '../img/g5.png';
import img6 from '../img/g6.png';

const url = "https://flightfusion-booking-website.onrender.com";

const PhotoGrid = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Define isAuthenticated state
  const destinations = [
    { name: 'Tokyo', img: img1 },
    { name: 'Paris', img: img2 },
    { name: 'Vienna', img: img3 },
    { name: 'Amsterdam', img: img4 },
    { name: 'Mombasa', img: img5 },
    { name: 'Turkey', img: img6 }
  ];

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const handleDestinationClick = async (destination) => {
    try {
      const response = await fetch(`${url}/flights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch flights');
      }
      const data = await response.json();
      // Handle the flight data, e.g., navigate to a flight page or display the flights
      console.log(data);
    } catch (error) {
      console.error('Error fetching flights:', error.message);
    }
  };

  return (
    <Container className='grid-sec'>
      <Row className="my-4 col-md-6">
        <Col xs={12} className="text-left">
          <h2 className="mb-4">Top Destinations</h2>
          <p className="destination-txt">Discover the world with convenience. <br />
            Book a flight with us today. </p>
        </Col>
      </Row>
      <div className='photo-grid'>
        <Row className="mb-2 pgrid">
          {destinations.map(destination => (
            <Col key={destination.name} xs={12} md={4} className="mb-1">
              {isAuthenticated ? (
                <Link to={`FlightBooking?destination=${destination.name}`} className="destination-link" onClick={() => handleDestinationClick(destination.name)}>
                  <Figure>
                    <Figure.Image src={destination.img} alt={destination.name} className="img-fluid" />
                    <Figure.Caption className="text-center">{destination.name}</Figure.Caption>
                  </Figure>
                </Link>
              ) : (
                <div className="destination-link" onClick={() => alert('Please login to view this destination.')}>
                  <Figure>
                    <Figure.Image src={destination.img} alt={destination.name} className="img-fluid" />
                    <Figure.Caption className="text-center">{destination.name}</Figure.Caption>
                  </Figure>
                </div>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default PhotoGrid;
