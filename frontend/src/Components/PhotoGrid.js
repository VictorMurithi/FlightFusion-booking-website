import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import img1 from '../img/g1.png';
import img2 from '../img/g2.png';
import img3 from '../img/g3.png';
import img4 from '../img/g4.png';
import img5 from '../img/g5.png';
import img6 from '../img/g6.png';

const PhotoGrid = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Define isAuthenticated state
  const destinations = [
    { name: 'Japan', img: img1 },
    { name: 'Mexico', img: img2 },
    { name: 'France', img: img3 },
    { name: 'England', img: img4 },
    { name: 'Bali', img: img5 },
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
                <Link to={`/Flightbooking`} className="destination-link">
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
