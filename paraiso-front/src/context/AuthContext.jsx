// src/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();
let globalLogout = () => {};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const jwt = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const rol = localStorage.getItem('rol');
    return jwt ? { jwt, email, rol } : null;
  });

  const login = (data) => {
    setAuth(data);
    localStorage.setItem('token', data.jwt);
    localStorage.setItem('email', data.email);
    localStorage.setItem('rol', data.rol);
  };

  const logout = () => {
    setAuth(null);
    localStorage.clear();
    window.location.href = '/login?expirada=true';; // redirige automáticamente
  };

  // asignamos logout a variable externa
  globalLogout = logout;

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// para usar dentro de componentes
export const useAuth = () => useContext(AuthContext);

// para usar fuera (en axiosInstance)
export const getLogout = () => globalLogout;

