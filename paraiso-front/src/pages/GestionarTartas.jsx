import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { obtenerTartas, crearTarta, actualizarTarta, eliminarTarta } from '../api/cakes';

const GestionarTartas = () => {
  const [tartas, setTartas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    id: null,
    nombre: '',
    descripcion: '',
  });

  const [mensaje, setMensaje] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTartas();
  }, []);

  const fetchTartas = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await obtenerTartas();
      setTartas(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    if (!form.nombre) {
      setError('El nombre es obligatorio');
      return;
    }

    try {
      if (isEditing) {
        await actualizarTarta(form.id, {
          nombre: form.nombre,
          descripcion: form.descripcion,
        });
        setMensaje('Tarta actualizada correctamente');
      } else {
        await crearTarta({
          nombre: form.nombre,
          descripcion: form.descripcion,
        });
        setMensaje('Tarta añadida correctamente');
      }

      setForm({ id: null, nombre: '', descripcion: '' });
      setIsEditing(false);
      fetchTartas();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (tarta) => {
    setForm({
      id: tarta.id,
      nombre: tarta.nombre,
      descripcion: tarta.descripcion,
    });
    setIsEditing(true);
    setMensaje('');
    setError('');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta tarta?')) return;

    setError('');
    setMensaje('');
    try {
      await eliminarTarta(id);
      setMensaje('Tarta eliminada correctamente');
      fetchTartas();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container my-5">
        <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>Administración de Tartas</h2>

        {mensaje && <div className="alert alert-success">{mensaje}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded" autoComplete="off">
          <h4>{isEditing ? 'Editar tarta' : 'Añadir tarta'}</h4>

          <div className="mb-3">
            <label className="form-label">Nombre *</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={form.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              className="form-control"
              value={form.descripcion}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            {isEditing ? 'Actualizar' : 'Añadir'}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setIsEditing(false);
                setForm({ id: null, nombre: '', descripcion: '' });
                setError('');
                setMensaje('');
              }}
            >
              Cancelar
            </button>
          )}
        </form>

        {loading ? (
          <p>Cargando tartas...</p>
        ) : tartas.length === 0 ? (
          <p>No hay tartas disponibles.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tartas.map((tarta) => (
                <tr key={tarta.id}>
                  <td>{tarta.nombre}</td>
                  <td>{tarta.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(tarta)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(tarta.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default GestionarTartas;
