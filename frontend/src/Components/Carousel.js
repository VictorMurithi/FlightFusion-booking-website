import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import img1 from '../img/Slide1.png';
import img2 from '../img/Slide2.png';
import img3 from '../img/Slide3.png';
import "../Css/Carousel.css";

const Carousel = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define your slides as an array of objects with image and text properties
  const slides = [
    { image: img1, text: 'FLIGHT FUSION BOOKINGS', text2: 'Discover the world with convenience.', text3: 'Book a flight with us today' },
    { image: img2, text: 'FLIGHT FUSION BOOKINGS', text2: 'Discover the world with convenience.', text3: 'Book a flight with us today' },
    { image: img3, text: 'FLIGHT FUSION BOOKINGS', text2: 'Discover the world with convenience.', text3: 'Book a flight with us today' },
  ];

  const token = localStorage.getItem('token');
  console.log(token);
  
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  }, [token]);

  useEffect(() => {
    // Automatically advance to the next slide every 6 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleBookFlightClick = () => {
    if (!isAuthenticated) {
      alert('Please login to book a flight');
    } else {
      navigate('/flightbooking');
    }
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="overlay">
              <p className="slide-text">{slide.text}</p>
              <p className="slide-text txt2">{slide.text2}</p>
              <p className="slide-text txt2">{slide.text3}</p>
              <div className='btn-holder'>
                <button className='btns' onClick={handleBookFlightClick}>Book A Flight</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
