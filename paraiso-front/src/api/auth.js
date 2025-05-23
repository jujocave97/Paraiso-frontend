// src/api/auth.js
import axios from 'axios';

const AUTH_API = axios.create({
  baseURL: 'http://localhost:8080/api/auth', // login y register no necesitan token
});

export const login = async (email, password) => {
  const res = await AUTH_API.post('/login', { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await AUTH_API.post('/register', userData);
  return res.data;
};

