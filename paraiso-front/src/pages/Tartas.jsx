import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

function Tartas() {
  return (
    <div className="d-flex flex-column min-vh-100">
    {/* NAV */}
    <Header/>


    {/* CONTENIDO */}
    <div className="container flex-grow-1 my-4">
      {/* Aquí va tu contenido de la tienda */}
    </div>

    <Footer />
  </div>
  );
}

export default Tartas;
