import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  obtenerTodasLasReservas,
  cambiarEstadoReserva,
  eliminarReserva,
  obtenerReservasPorNombreUsuario
} from '../api/reservas';

const GestionarReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtroNombre, setFiltroNombre] = useState('');

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async (nombreFiltro = '') => {
    setCargando(true);
    setError(null);
    try {
      const datos = nombreFiltro.trim()
        ? await obtenerReservasPorNombreUsuario(nombreFiltro.trim())
        : await obtenerTodasLasReservas();
      setReservas(datos);
    } catch (err) {
      setError('Error al cargar las reservas');
      setReservas([]);
    } finally {
      setCargando(false);
    }
  };

  const manejarCambioEstado = async (id, nuevoEstado) => {
    try {
      await cambiarEstadoReserva(id, nuevoEstado);
      cargarReservas(filtroNombre);
    } catch (err) {
      alert('Error al cambiar el estado');
    }
  };

  const manejarEliminar = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta reserva?')) {
      try {
        await eliminarReserva(id);
        cargarReservas(filtroNombre);
      } catch (err) {
        alert('Error al eliminar la reserva');
      }
    }
  };

  const manejarBuscar = () => {
    cargarReservas(filtroNombre);
  };

  const manejarLimpiarFiltro = () => {
    setFiltroNombre('');
    cargarReservas('');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>
          Administración de Reservas
        </h2>

        {/* Filtro por email */}
        <div className="mb-4 d-flex flex-column flex-md-row justify-content-center align-items-center gap-2">
          <input
            type="text"
            placeholder="Filtrar por email"
            className="form-control"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && manejarBuscar()}
            style={{ maxWidth: '400px' }}
          />
          <button className="btn btn-primary" onClick={manejarBuscar}>Buscar</button>
          <button className="btn btn-secondary" onClick={manejarLimpiarFiltro}>Limpiar</button>
        </div>

        {cargando && <div className="text-center">Cargando reservas...</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {!cargando && reservas.length === 0 && (
          <div className="alert alert-info text-center">No hay reservas registradas.</div>
        )}

        {/* 🖥️ Tabla en pantallas grandes */}
        <div className="d-none d-md-block table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Tarta</th>
                <th>Cantidad</th>
                <th>Comentario</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.id}</td>
                  <td>{reserva.usuario}</td>
                  <td className="text-break">{reserva.email}</td>
                  <td>{reserva.cakeId}</td>
                  <td>{reserva.cantidad}</td>
                  <td>{reserva.comentario || '-'}</td>
                  <td>{new Date(reserva.fechaReserva).toLocaleString()}</td>
                  <td>
                    <select
                      className="form-select"
                      value={reserva.estado}
                      onChange={(e) =>
                        manejarCambioEstado(reserva.id, e.target.value)
                      }
                    >
                      {['PENDIENTE', 'EN_CURSO', 'LISTO_PARA_RECOGER', 'CANCELADA'].map((estado) => (
                        <option key={estado} value={estado}>
                          {estado.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => manejarEliminar(reserva.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📱 Tarjetas en móviles */}
        <div className="d-md-none">
          {reservas.map((reserva) => (
            <div className="card mb-3" key={reserva.id}>
              <div className="card-body">
                <h5 className="card-title">
                  <strong>Reserva #{reserva.id}</strong>
                </h5>
                <p><strong>Usuario:</strong> {reserva.usuario}</p>
                <p><strong>Email:</strong> {reserva.email}</p>
                <p><strong>Tarta:</strong> {reserva.cakeId}</p>
                <p><strong>Cantidad:</strong> {reserva.cantidad}</p>
                <p><strong>Comentario:</strong> {reserva.comentario || '-'}</p>
                <p><strong>Fecha:</strong> {new Date(reserva.fechaReserva).toLocaleString()}</p>
                <div className="mb-2">
                  <label className="form-label"><strong>Estado:</strong></label>
                  <select
                    className="form-select"
                    value={reserva.estado}
                    onChange={(e) =>
                      manejarCambioEstado(reserva.id, e.target.value)
                    }
                  >
                    {['PENDIENTE', 'EN_CURSO', 'LISTO_PARA_RECOGER', 'CANCELADA'].map((estado) => (
                      <option key={estado} value={estado}>
                        {estado.replace(/_/g, ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="btn btn-danger btn-sm w-100"
                  onClick={() => manejarEliminar(reserva.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GestionarReservas;
