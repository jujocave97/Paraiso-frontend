import axios from 'axios';
import { getLogout } from '../context/AuthContext';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      const logout = getLogout();

      // Limpia sesión y redirige al login con notificación
      logout(); // ✅ tu función logout
      window.location.href = '/login?expirada=true'; // ✅ redirige con mensaje
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
