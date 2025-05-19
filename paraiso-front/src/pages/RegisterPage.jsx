// src/pages/RegisterPage.js
import React from 'react';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm.jsx';
import Footer from '../components/Footer';

const RegisterPage = () => (
  <div className="d-flex flex-column min-vh-100">
    <Header />

    <div className="container flex-grow-1 my-5">
      <h1 className="text-center">Registrarse</h1>
      <RegisterForm />
    </div>

    <Footer />
  </div>
);

export default RegisterPage;
