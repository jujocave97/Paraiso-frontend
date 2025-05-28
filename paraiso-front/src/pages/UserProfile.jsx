import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
  });

  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/${auth.email}`);
        setForm(res.data);
      } catch (err) {
        setMensaje('No se pudo cargar tu perfil');
      }
    };
    fetchUser();
  }, [auth.email]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.put(`/users/${auth.email}`, form);
      setMensaje('Perfil actualizado correctamente');
      setForm(res.data);
    } catch (err) {
      setMensaje('Error al actualizar perfil');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmacion = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (!confirmacion) return;

    try {
      await axiosInstance.delete(`/users/${auth.email}`);
      logout(); // limpia el contexto de autenticación
      navigate('/'); // redirige a inicio
    } catch (err) {
      setMensaje('Error al eliminar la cuenta');
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="container flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="w-100" style={{ maxWidth: '600px' }}>
          <h2 className="mb-4 text-center" style={{ color: '#40d9c6' }}>Mi Perfil</h2>

          <form onSubmit={handleSubmit} className="p-4 rounded shadow" style={{ backgroundColor: '#fff' }}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                name="nombre"
                type="text"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellidos</label>
              <input
                name="apellidos"
                type="text"
                className="form-control"
                value={form.apellidos}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correo electrónico</label>
              <input
                name="email"
                type="email"
                className="form-control"
                value={form.email}
                disabled
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                name="telefono"
                type="tel"
                className="form-control"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            {mensaje && <div className="alert alert-info">{mensaje}</div>}

            <div className="d-grid gap-2">
              <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: '#fff' }}>
                Guardar Cambios
              </button>

              {/* Solo permitir eliminar si es USUARIO */}
              {auth.rol === 'USUARIO' && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDeleteAccount}
                >
                  Eliminar cuenta
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfile;
