import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  obtenerTodasLasReservas,
  cambiarEstadoReserva,
  eliminarReserva,
  obtenerReservasPorNombreUsuario  // <-- importamos la función nueva
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
      let datos;
      if (nombreFiltro.trim() !== '') {
        datos = await obtenerReservasPorNombreUsuario(nombreFiltro.trim());
      } else {
        datos = await obtenerTodasLasReservas();
      }
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

        {/* Filtro por nombre de usuario */}
        <div className="mb-4 d-flex justify-content-center gap-2">
          <input
            type="text"
            placeholder="Filtrar por email"
            className="form-control"
            value={filtroNombre}
            onChange={(e) => setFiltroNombre(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && manejarBuscar()}
            style={{ maxWidth: '400px' }}
          />
          <button className="btn btn-primary" onClick={manejarBuscar}>
            Buscar
          </button>
          <button className="btn btn-secondary" onClick={manejarLimpiarFiltro}>
            Limpiar
          </button>
        </div>

        {cargando && <div className="text-center">Cargando reservas...</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {!cargando && reservas.length === 0 && (
          <div className="alert alert-info text-center">
            No hay reservas registradas.
          </div>
        )}

        {!cargando && reservas.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
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
                    <td>{reserva.email}</td>
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
                        {['PENDIENTE', 'EN_CURSO', 'LISTO_PARA_RECOGER', 'CANCELADA'].map(
                          (estado) => (
                            <option key={estado} value={estado}>
                              {estado.replace(/_/g, ' ')}
                            </option>
                          )
                        )}
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
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GestionarReservas;
