// src/api/auth.js
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const AUTH_API = axios.create({
  baseURL: apiUrl+'/api/auth', // login y register no necesitan token
});

export const login = async (email, password) => {
  const res = await AUTH_API.post('/login', { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await AUTH_API.post('/register', userData);
  return res.data;
};

// Enviar email para recuperación
export const solicitarRecuperacion = (email) => {
  return AUTH_API.post('/recover', null, {
    params: { email },
  });
};

// Establecer nueva contraseña
export const resetearContrasena = (token, nuevaPassword) => {
  return axios.post(apiUrl+'/auth/reset-password', {
    token,
    nuevaPassword,
  });
};
