import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import {
  obtenerTodosLosUsuarios,
  actualizarUsuario,
  eliminarUsuario
} from '../api/users';

const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [editandoEmail, setEditandoEmail] = useState(null);
  const [datosEditados, setDatosEditados] = useState({});

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setCargando(true);
    setError(null);
    try {
      const data = await obtenerTodosLosUsuarios();
      setUsuarios(data);
    } catch (err) {
      setError('Error al cargar los usuarios');
      setUsuarios([]);
    } finally {
      setCargando(false);
    }
  };

  const manejarEditarClick = (email) => {
    setEditandoEmail(email);
    const usuario = usuarios.find(u => u.email === email);
    setDatosEditados({ ...usuario });
  };

  const manejarCancelarEdicion = () => {
    setEditandoEmail(null);
    setDatosEditados({});
  };

  const manejarCambioInput = (e) => {
    setDatosEditados({
      ...datosEditados,
      [e.target.name]: e.target.value
    });
  };

  const manejarGuardar = async () => {
    try {
      await actualizarUsuario(editandoEmail, datosEditados);
      setEditandoEmail(null);
      setDatosEditados({});
      cargarUsuarios();
    } catch (err) {
      alert('Error al actualizar usuario');
    }
  };

  const manejarEliminar = async (email) => {
    if (window.confirm(`¿Seguro que deseas eliminar al usuario ${email}?`)) {
      try {
        await eliminarUsuario(email);
        cargarUsuarios();
      } catch (err) {
        alert('Error al eliminar usuario');
      }
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>Administración de Usuarios</h2>

        {cargando && <div className="text-center">Cargando usuarios...</div>}
        {error && <div className="alert alert-danger text-center">{error}</div>}

        {!cargando && usuarios.length === 0 && (
          <div className="alert alert-info text-center">
            No hay usuarios registrados.
          </div>
        )}

        {!cargando && usuarios.length > 0 && (
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Email</th>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Teléfono</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.email}>
                    <td>{usuario.email}</td>
                    <td>
                      {editandoEmail === usuario.email ? (
                        <input
                          type="text"
                          name="nombre"
                          value={datosEditados.nombre || ''}
                          onChange={manejarCambioInput}
                          className="form-control"
                        />
                      ) : (
                        usuario.nombre
                      )}
                    </td>
                    <td>
                      {editandoEmail === usuario.email ? (
                        <input
                          type="text"
                          name="apellidos"
                          value={datosEditados.apellidos || ''}
                          onChange={manejarCambioInput}
                          className="form-control"
                        />
                      ) : (
                        usuario.apellidos
                      )}
                    </td>
                    <td>
                      {editandoEmail === usuario.email ? (
                        <input
                          type="tel"
                          name="telefono"
                          value={datosEditados.telefono || ''}
                          onChange={manejarCambioInput}
                          className="form-control"
                        />
                      ) : (
                        usuario.telefono
                      )}
                    </td>
                    <td>
                      {editandoEmail === usuario.email ? (
                        <select
                          name="rol"
                          value={datosEditados.rol || ''}
                          onChange={manejarCambioInput}
                          className="form-select"
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      ) : (
                        usuario.rol
                      )}
                    </td>
                    <td>
                      {editandoEmail === usuario.email ? (
                        <>
                          <button className="btn btn-success btn-sm me-2" onClick={manejarGuardar}>
                            Guardar
                          </button>
                          <button className="btn btn-secondary btn-sm" onClick={manejarCancelarEdicion}>
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => manejarEditarClick(usuario.email)}
                          >
                            Editar
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => manejarEliminar(usuario.email)}
                          >
                            Eliminar
                          </button>
                        </>
                      )}
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

export default GestionarUsuarios;
