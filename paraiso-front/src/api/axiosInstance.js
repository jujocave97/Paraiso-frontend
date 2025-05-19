import axios from 'axios';
import { getLogout } from '../context/AuthContext'; // 👈 importa logout

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
      logout(); // 👈 ejecuta logout automático
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

