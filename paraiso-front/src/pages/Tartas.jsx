import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Tartas() {
  const tartas = [
    { nombre: 'Tarta de Pistacho', imagen: '/imgs/pistacho1.png' },
    { nombre: 'Tarta de Queso con Filipinos', imagen: '/imgs/tartaQueso1.png' },
    { nombre: 'Tarta de Happy Hippo', imagen: '/imgs/happyhipo.jpg' },
    { nombre: 'Tarta de Nestle Jungly', imagen: '/imgs/jungly.jpg' },
    { nombre: 'Tarta de Lotus', imagen: '/imgs/lotus.jpg' },
    { nombre: 'Tarta de Lotus', imagen: '/imgs/oreo.jpg' },
  ];

  const galletas = [
    { nombre: 'Galleta de Mantequilla', imagen: '/imgs/tartaQueso1.png' },
    { nombre: 'Galleta de Chocolate', imagen: '/imgs/tartaQueso1.png' },
    { nombre: 'Galleta de Avena', imagen: '/imgs/tartaQueso1.png' },
  ];

  const helados = [
    { nombre: 'Helado de Mantequilla', imagen: '/imgs/tartaQueso1.png' },
    { nombre: 'Helado de Chocolate', imagen: '/imgs/tartaQueso1.png' },
    { nombre: 'Helado de Avena', imagen: '/imgs/tartaQueso1.png' },
  ];

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
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="container flex-grow-1 my-5" style={{ maxWidth: '900px' }}>
        <section>
          <h2 style={{ textAlign: 'center', color: '#40d9c6', fontWeight: '700', marginBottom: '2rem' }}>
            Tartas de Queso
          </h2>
          <Slider {...settings}>
            {tartas.map(({ nombre, imagen }, index) => (
              <div key={index} style={{ outline: 'none' }}>
                <img
                  src={imagen}
                  alt={nombre}
                  style={{
                    maxHeight: '400px',
                    maxWidth: '100%',
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    objectFit: 'contain',
                  }}
                />
                <h5 style={{ marginTop: '1rem', fontWeight: '600', color: '#003153', textAlign: 'center' }}>
                  {nombre}
                </h5>
              </div>
            ))}
          </Slider>
        </section>

        <section style={{ marginTop: '5rem' }}>
          <h2 style={{ textAlign: 'center', color: '#40d9c6', fontWeight: '700', marginBottom: '2rem' }}>
            Galletas
          </h2>
          <Slider {...settings}>
            {galletas.map(({ nombre, imagen }, index) => (
              <div key={index} style={{ outline: 'none' }}>
                <img
                  src={imagen}
                  alt={nombre}
                  style={{
                    maxHeight: '400px',
                    maxWidth: '100%',
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    objectFit: 'contain',
                  }}
                />
                <h5 style={{ marginTop: '1rem', fontWeight: '600', color: '#003153', textAlign: 'center' }}>
                  {nombre}
                </h5>
              </div>
            ))}
          </Slider>
        </section>

        <section style={{ marginTop: '5rem' }}>
          <h2 style={{ textAlign: 'center', color: '#40d9c6', fontWeight: '700', marginBottom: '2rem' }}>
            Helados
          </h2>
          <Slider {...settings}>
            {galletas.map(({ nombre, imagen }, index) => (
              <div key={index} style={{ outline: 'none' }}>
                <img
                  src={imagen}
                  alt={nombre}
                  style={{
                    maxHeight: '400px',
                    maxWidth: '100%',
                    margin: '0 auto',
                    display: 'block',
                    borderRadius: '10px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                    objectFit: 'contain',
                  }}
                />
                <h5 style={{ marginTop: '1rem', fontWeight: '600', color: '#003153', textAlign: 'center' }}>
                  {nombre}
                </h5>
              </div>
            ))}
          </Slider>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Tartas;
