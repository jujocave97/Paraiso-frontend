// src/pages/LoginPage.js
import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const LoginPage = () => (
  <div className="d-flex flex-column min-vh-100">
    <Header />
    
    <div className="container flex-grow-1 my-5">
      <h1 className="text-center">Iniciar Sesión</h1>
      <LoginForm />
    </div>

    <Footer />
  </div>
);

export default LoginPage;
