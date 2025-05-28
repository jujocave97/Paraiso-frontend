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

  // Estado para errores por campo
  const [errors, setErrors] = useState({});

  const [mensaje, setMensaje] = useState('');

  // Validaciones simples para cada campo
  const validateField = (name, value) => {
    switch (name) {
      case 'nombre':
        if (!value.trim()) return 'El nombre es obligatorio';
        if (value.length < 2) return 'El nombre debe tener al menos 2 caracteres';
        return '';
      case 'apellidos':
        if (!value.trim()) return 'Los apellidos son obligatorios';
        if (value.length < 2) return 'Los apellidos deben tener al menos 2 caracteres';
        return '';
      case 'email':
        if (!value.trim()) return 'El email es obligatorio';
        // Regex simple para email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email no válido';
        return '';
      case 'telefono':
        if (!value.trim()) return 'El teléfono es obligatorio';
        if (!/^\d{9}$/.test(value)) return 'El teléfono debe tener 9 dígitos';
        return '';
      case 'password':
        if (!value.trim()) return 'La contraseña es obligatoria';
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{6,100}$/.test(value))
          return 'La contraseña debe contener letras y números, mínimo 6 caracteres';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validar mientras escribe
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.entries(form).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // true si no hay errores
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    if (!validateForm()) {
      setMensaje('Por favor corrige los errores antes de enviar.');
      return;
    }

    try {
      await registerApi(form);
      setMensaje('🎉 Registro exitoso. Ahora puedes iniciar sesión.');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data) {
        // Suponemos que error.response.data es un objeto con { campo: mensaje }
        setErrors(error.response.data);
      } else {
        setMensaje('❌ Hubo un error al registrar. Verifica los datos.');
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit}
        className="p-5 rounded shadow"
        style={{ maxWidth: '500px', width: '100%', backgroundColor: '#ffffff' }}
        noValidate
      >
        {['nombre', 'apellidos', 'email', 'telefono', 'password'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              name={field}
              id={field}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
              placeholder={field === 'email' ? 'usuario@correo.com' : ''}
              value={form[field]}
              onChange={handleChange}
              required
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}

        {mensaje && (
          <div className={`alert ${mensaje.startsWith('🎉') ? 'alert-success' : 'alert-danger'} py-1`}>
            {mensaje}
          </div>
        )}

        <div className="d-grid">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: '#40d9c6', color: 'white' }}
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
