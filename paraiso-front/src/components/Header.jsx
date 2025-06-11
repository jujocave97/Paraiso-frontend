// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../App.css';

const Header = () => {
  const { auth, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#40d9c6' }}>
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto text-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tartas">Nuestros Productos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/quienessomos">Quiénes somos</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mas">Contacto</Link>
            </li>

            {auth?.rol === 'USUARIO' && (
              <li className="nav-item">
                <Link className="nav-link" to="/reservar">Reservar Tarta</Link>
              </li>
            )}

            {auth?.rol === 'ADMIN' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/reservas">Gestionar Reservas</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/usuarios">Gestionar Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/tartas">Gestionar Tartas</Link>
                </li>
              </>
            )}



            {/* Login/Registro o Cerrar sesión */}
            {!auth ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Registro</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/perfil">{auth.email}</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={logout}>Cerrar sesión</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
