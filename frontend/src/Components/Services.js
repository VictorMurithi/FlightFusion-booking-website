import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import illustration from '../img/illustration.png';
import "../Css/Home.css";
// import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
  return (
    <Container className='services'>
      {/* <Row className="my-4">
        <Col xs={12} className="text-center">
          <h2>We Offer The Best Services</h2>
        </Col>
      </Row> */}

      <Row className="my-4">
        {/* List Column */}
        <Col xs={8} md={7} className="mb-4 list-container">
          <Col xs={12} md={8} className="mb-3">
            <div className="list-item">
              {/* <div className="list-item-number">01</div> */}
              <div className="list-item-content">
                <h5><span className='list-item-number' >01</span>Instant Ticket</h5>
                <p>Secure your seat and get your ticket now</p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={8} className="mb-3">
            <div className="list-item">
              <div className="list-item-number">02</div>
              <div className="list-item-content">
                <h5>Worldwide Flight</h5>
                <p>Book your worldwide flight instantly</p>
              </div>
            </div>
          </Col>

          <Col xs={12} md={8} className="mb-3">
            <div className="list-item">
              <div className="list-item-number">03</div>
              <div className="list-item-content">
                <h5>Trusted Booking</h5>
                <p>Reliable bookings, instant peace of mind. Book your flight with trust.</p>
              </div>
            </div>
          </Col>
        </Col>

        {/* Hello Column */}
        <Col xs={12} md={5} className="mb-4 illustration-container">
          <h5 className="text-center">We Offer The Best Services</h5>
          <img src={illustration} alt="Illustration" className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default Services;
