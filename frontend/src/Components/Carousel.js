import React, { useState, useEffect } from 'react';
import img1 from '../img/Slide1.png';
import img2 from '../img/Slide2.png';
import img3 from '../img/Slide3.png';
import "../Css/Carousel.css";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define your slides as an array of objects with image and text properties
  const slides = [
    { image: img1, text: 'FLIGHT FUSION BOOKINGS' },
    { image: img2, text: 'FLIGHT FUSION BOOKINGS' },
    { image: img3, text: 'FLIGHT FUSION BOOKINGS' },
  ];

  useEffect(() => {
    // Automatically advance to the next slide every 3 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [slides.length]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className="slide" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="overlay">
              <p className="slide-text ">{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;