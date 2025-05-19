// src/components/RegisterForm.js
import { useState } from 'react';
import { register as registerApi } from '../api/auth';

const RegisterForm = () => {
  const [form, setForm] = useState({ email: '', password: '', nombre: '' });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerApi(form);
      setMensaje('Registro exitoso. Ahora puedes iniciar sesión.');
    } catch (err) {
      setMensaje('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
      <button type="submit">Registrarse</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
};

export default RegisterForm;
