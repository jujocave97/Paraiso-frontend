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
          <div className="alert alert-info text-center">No hay usuarios registrados.</div>
        )}

        {/* 🟦 Tabla en pantallas grandes */}
        <div className="d-none d-md-block table-responsive">
          <table className="table table-bordered table-hover align-middle text-center">
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
                  <td className="text-break">{usuario.email}</td>
                  <td>
                    {editandoEmail === usuario.email ? (
                      <input type="text" name="nombre" value={datosEditados.nombre || ''} onChange={manejarCambioInput} className="form-control form-control-sm" />
                    ) : usuario.nombre}
                  </td>
                  <td>
                    {editandoEmail === usuario.email ? (
                      <input type="text" name="apellidos" value={datosEditados.apellidos || ''} onChange={manejarCambioInput} className="form-control form-control-sm" />
                    ) : usuario.apellidos}
                  </td>
                  <td>
                    {editandoEmail === usuario.email ? (
                      <input type="tel" name="telefono" value={datosEditados.telefono || ''} onChange={manejarCambioInput} className="form-control form-control-sm" />
                    ) : usuario.telefono}
                  </td>
                  <td>{usuario.rol}</td>
                  <td className="d-flex flex-wrap justify-content-center gap-1">
                    {editandoEmail === usuario.email ? (
                      <>
                        <button className="btn btn-success btn-sm" onClick={manejarGuardar}>Guardar</button>
                        <button className="btn btn-secondary btn-sm" onClick={manejarCancelarEdicion}>Cancelar</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-primary btn-sm" onClick={() => manejarEditarClick(usuario.email)}>Editar</button>
                        <button className="btn btn-danger btn-sm" onClick={() => manejarEliminar(usuario.email)}>Eliminar</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 🟩 Tarjetas en móviles */}
        <div className="d-md-none">
          {usuarios.map((usuario) => (
            <div className="card mb-3" key={usuario.email}>
              <div className="card-body">
                <h5 className="card-title text-break">{usuario.email}</h5>
                <p className="mb-1"><strong>Nombre:</strong> {editandoEmail === usuario.email ? (
                  <input type="text" name="nombre" value={datosEditados.nombre || ''} onChange={manejarCambioInput} className="form-control form-control-sm" />
                ) : usuario.nombre}</p>
                <p className="mb-1"><strong>Apellidos:</strong> {editandoEmail === usuario.email ? (
                  <input type="text" name="apellidos" value={datosEditados.apellidos || ''} onChange={manejarCambioInput} className="form-control form-control-sm" />
                ) : usuario.apellidos}</p>
                <p className="mb-1"><strong>Teléfono:</strong> {editandoEmail === usuario.email ? (
                  <input type="tel" name="telefono" value={datosEditados.telefono || ''} onChange={manejarCambioInput} className="form-control form-control-sm" />
                ) : usuario.telefono}</p>
                <p className="mb-2"><strong>Rol:</strong> {usuario.rol}</p>
                <div className="d-flex flex-wrap gap-2">
                  {editandoEmail === usuario.email ? (
                    <>
                      <button className="btn btn-success btn-sm" onClick={manejarGuardar}>Guardar</button>
                      <button className="btn btn-secondary btn-sm" onClick={manejarCancelarEdicion}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={() => manejarEditarClick(usuario.email)}>Editar</button>
                      <button className="btn btn-danger btn-sm" onClick={() => manejarEliminar(usuario.email)}>Eliminar</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default GestionarUsuarios;
