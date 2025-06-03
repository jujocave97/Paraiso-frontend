import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage = () => (
  <div className="d-flex flex-column min-vh-100">
    <Header />

    <div className="container flex-grow-1 my-5">
      <h1 className="text-center mb-4">Recuperar Contraseña</h1>
      <ForgotPasswordForm />
    </div>

    <Footer />
  </div>
);

export default ForgotPasswordPage;
