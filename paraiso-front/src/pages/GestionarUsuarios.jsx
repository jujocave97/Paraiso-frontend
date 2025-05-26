import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GestionarUsuarios = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>Administración de Usuarios</h2>
        {/* Aquí iría la lógica para listar, editar o eliminar usuarios */}
        <div className="alert alert-info text-center">Funcionalidad en desarrollo</div>
      </div>
      <Footer />
    </div>
  );
};

export default GestionarUsuarios;
