import React, { useState } from 'react';
import { solicitarRecuperacion } from '../api/auth';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    try {
      await solicitarRecuperacion(email);
      setMensaje('Hemos enviado un correo con instrucciones para restablecer tu contraseña.');
    } catch (err) {
      setError('No se pudo enviar el correo. Verifica tu email.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-white">
      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Enviar Instrucciones
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
