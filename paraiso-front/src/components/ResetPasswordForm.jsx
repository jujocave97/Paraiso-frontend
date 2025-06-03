import React, { useState } from 'react';
import { resetearContrasena } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = ({ token }) => {
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (nuevaPassword !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      await resetearContrasena(token, nuevaPassword);
      setMensaje('Contraseña actualizada correctamente. Ahora puedes iniciar sesión.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError('Token inválido o expirado.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded shadow bg-white">
      <div className="mb-3">
        <label className="form-label">Nueva contraseña</label>
        <input
          type="password"
          className="form-control"
          value={nuevaPassword}
          onChange={(e) => setNuevaPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Confirmar contraseña</label>
        <input
          type="password"
          className="form-control"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          required
        />
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Restablecer contraseña
        </button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
