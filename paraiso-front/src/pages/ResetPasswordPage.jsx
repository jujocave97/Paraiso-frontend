import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResetPasswordForm from '../components/ResetPasswordForm';
import { useParams } from 'react-router-dom';

const ResetPasswordPage = () => {
  const { token } = useParams();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="container flex-grow-1 my-5">
        <h1 className="text-center mb-4">Establecer Nueva Contraseña</h1>
        <ResetPasswordForm token={token} />
      </div>

      <Footer />
    </div>
  );
};

export default ResetPasswordPage;
