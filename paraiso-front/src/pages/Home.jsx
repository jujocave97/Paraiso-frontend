import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <header className="bg-turquesa text-white text-center py-5">
        <img src="./../../imgs/paraiso-logo-wide.png" alt="paraiso-logo" />
        <p className="lead">Sin tartas no hay paraíso.</p>
      </header>

      <div className="container flex-grow-1 my-4">
        {/* Aquí va tu contenido de la tienda */}
      </div>

      <Footer />
    </div>
  );
}

export default Home;
