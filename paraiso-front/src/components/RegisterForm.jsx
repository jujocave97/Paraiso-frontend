import { useState } from 'react';
import { register as registerApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    password: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');
    try {
      await registerApi(form);
      setMensaje('🎉 Registro exitoso. Ahora puedes iniciar sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);

    } catch (err) {
      setError('❌ Hubo un error al registrar. Verifica los datos.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="p-5 rounded shadow" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#ffffff' }}>

        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            type="text"
            className="form-control"
            placeholder="Nombre"
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
            placeholder="Apellidos"
            value={form.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="usuario@correo.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            name="telefono"
            type="tel"
            className="form-control"
            placeholder="666123456"
            value={form.telefono}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            name="password"
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {mensaje && <div className="alert alert-success py-1">{mensaje}</div>}
        {error && <div className="alert alert-danger py-1">{error}</div>}

        <div className="d-grid">
          <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: 'white' }}>
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
