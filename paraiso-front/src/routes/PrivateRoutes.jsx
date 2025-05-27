import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, roles = [] }) => {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/login" />;

  if (roles.length && !roles.includes(auth.rol)) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
