// src/components/ImageCarousel.jsx
import React from 'react';
import Slider from "react-slick";

function ImageCarousel({ title, items }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  return (
    <div className="my-5">
      <h2
        className="text-center mb-4"
        style={{
          fontWeight: '700',
          fontSize: '2rem',
          color: '#40d9c6',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        {title}
      </h2>

      <Slider {...settings}>
        {items.map(({ nombre, imagen }, index) => (
          <div key={index} className="text-center px-3">
            <img
              src={imagen}
              alt={nombre}
              className="img-fluid mx-auto"
              style={{ maxHeight: '400px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
            />
            <h5 className="mt-3" style={{ fontWeight: '600', color: '#003153' }}>{nombre}</h5>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageCarousel;
