import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login as loginApi } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expirada') === 'true') {
      setErrorGeneral('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
    }
  }, [location]);

  // Validación por campo
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value.trim()) return 'El correo electrónico es obligatorio';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo electrónico no válido';
        return '';
      case 'password':
        if (!value.trim()) return 'La contraseña es obligatoria';
        if (value.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Validar en tiempo real
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setErrorGeneral(''); // Limpiar error general al escribir
  };

  // Validar todo el formulario antes de enviar
  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorGeneral('');

    if (!validateForm()) {
      setErrorGeneral('Por favor corrige los errores antes de enviar.');
      return;
    }

    try {
      const data = await loginApi(form.email, form.password);
      login(data);
      navigate('/');
    } catch (err) {
      setErrorGeneral('Credenciales incorrectas');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded shadow"
        style={{ maxWidth: '400px', width: '100%', backgroundColor: '#ffffff' }}
        noValidate
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo electrónico</label>
          <input
            name="email"
            id="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="usuario@correo.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input
            name="password"
            id="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        {errorGeneral && <div className="alert alert-danger py-1">{errorGeneral}</div>}

        <div className="d-grid">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#40d9c6', color: 'white' }}
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
