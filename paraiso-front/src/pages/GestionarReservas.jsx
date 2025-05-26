import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GestionarReservas = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>Administración de Reservas</h2>
        {/* Aquí iría la lógica para ver y cambiar estado de reservas */}
        <div className="alert alert-info text-center">Funcionalidad en desarrollo</div>
      </div>
      <Footer />
    </div>
  );
};

export default GestionarReservas;
