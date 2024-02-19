import React, { useState, useEffect } from 'react';
import image1 from '../img/Card1.png';
import image2 from '../img/Card2.png';
import image3 from '../img/Card3.png';
import "../Css/Home.css";

const Cards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    image1,
    image2,
    image3
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <div className='card-container'>
      <div style={{ display: 'flex', transition: 'transform 0.5s ease-in-out', transform: `translateX(-${currentIndex * 966}px)` }}>
        {slides.map((slide, index) => (
          <img key={index} src={slide} alt={`Slide ${index + 1}`} style={{ backgroundSize: 'cover' }} />
        ))}
      </div>
    </div>
  );
};

export default Cards;