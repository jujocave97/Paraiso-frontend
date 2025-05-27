import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login as loginApi } from '../api/auth.js';
import { useAuth } from '../context/AuthContext.jsx';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expirada') === 'true') {
      setError('Tu sesión ha expirado. Por favor, inicia sesión nuevamente.');
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginApi(email, password);
      login(data);
      navigate('/');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form onSubmit={handleSubmit} className="p-5 rounded shadow" style={{ maxWidth: '400px', width: '100%', backgroundColor: '#ffffff' }}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            placeholder="usuario@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <div className="alert alert-danger py-1">{error}</div>}

        <div className="d-grid">
          <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: 'white' }}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
