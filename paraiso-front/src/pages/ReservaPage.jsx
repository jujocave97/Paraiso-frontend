import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { reservarTarta } from '../api/reservas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListaReservasUsuario from '../components/ListaReservasUsuario';

const ReservaPage = () => {
  const [tartas, setTartas] = useState([]);
  const [cakeId, setCakeId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [recargarReservas, setRecargarReservas] = useState(0);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const cargarTartas = async () => {
      try {
        const res = await axiosInstance.get('/cakes/');
        setTartas(res.data);
      } catch {
        setMensaje('❌ Error al cargar las tartas.');
      }
    };
    cargarTartas();
  }, []);

  // Validación local de cada campo
  const validarCampo = (name, value) => {
    switch (name) {
      case 'cakeId':
        if (!value) return 'Debes seleccionar una tarta';
        return '';
      case 'cantidad':
        if (!value) return 'La cantidad es obligatoria';
        if (isNaN(value) || Number(value) < 1) return 'La cantidad debe ser un número mayor o igual a 1';
        return '';
      case 'comentario':
        if (value.length > 100) return 'El comentario no puede superar 100 caracteres';
        return '';
      default:
        return '';
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {
      cakeId: validarCampo('cakeId', cakeId),
      cantidad: validarCampo('cantidad', cantidad),
      comentario: validarCampo('comentario', comentario),
    };

    // Eliminar campos sin error
    Object.keys(nuevosErrores).forEach(key => {
      if (!nuevosErrores[key]) delete nuevosErrores[key];
    });

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('');
    setErrores({});

    if (!validarFormulario()) {
      setMensaje('Por favor corrige los errores antes de continuar.');
      return;
    }

    abrirModal();
  };

  const confirmarReserva = async () => {
    cerrarModal();
    setMensaje('');
    setErrores({});

    try {
      const reserva = {
        cakeId,
        cantidad: Number(cantidad),
        comentario,
      };
      await reservarTarta(reserva);
      setRecargarReservas(prev => prev + 1);
      setMensaje('🎉 ¡Reserva realizada con éxito!');
      setCakeId('');
      setCantidad(1);
      setComentario('');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrores(err.response.data);
      } else {
        setMensaje('❌ Error al realizar la reserva.');
      }
    }
  };

  // Actualiza valor y valida campo en tiempo real
  const handleChange = (name, value) => {
    switch (name) {
      case 'cakeId':
        setCakeId(value);
        setErrores(prev => ({ ...prev, cakeId: validarCampo(name, value) }));
        break;
      case 'cantidad':
        setCantidad(value);
        setErrores(prev => ({ ...prev, cantidad: validarCampo(name, value) }));
        break;
      case 'comentario':
        setComentario(value);
        setErrores(prev => ({ ...prev, comentario: validarCampo(name, value) }));
        break;
      default:
        break;
    }
    setMensaje('');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container flex-grow-1 my-5">
        <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>Reservar una Tarta</h2>

        <form onSubmit={handleSubmit} className="p-4 rounded shadow mx-auto" style={{ maxWidth: '600px', backgroundColor: '#fff' }}>
          <div className="mb-3">
            <label className="form-label">Selecciona una Tarta</label>
            <select
              className={`form-select ${errores.cakeId ? 'is-invalid' : ''}`}
              value={cakeId}
              onChange={e => handleChange('cakeId', e.target.value)}
              required
            >
              <option value="">-- Elige una tarta --</option>
              {tartas.map((tarta) => (
                <option key={tarta.id} value={tarta.id}>
                  {tarta.nombre}
                </option>
              ))}
            </select>
            {errores.cakeId && <div className="invalid-feedback">{errores.cakeId}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              min="1"
              className={`form-control ${errores.cantidad ? 'is-invalid' : ''}`}
              value={cantidad}
              onChange={e => handleChange('cantidad', e.target.value)}
              required
            />
            {errores.cantidad && <div className="invalid-feedback">{errores.cantidad}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Comentario (opcional)</label>
            <textarea
              className={`form-control ${errores.comentario ? 'is-invalid' : ''}`}
              placeholder="Instrucciones adicionales..."
              value={comentario}
              onChange={e => handleChange('comentario', e.target.value)}
              maxLength={200}
            />
            {errores.comentario && <div className="invalid-feedback">{errores.comentario}</div>}
          </div>

          {mensaje && <div className={`alert ${Object.keys(errores).length ? 'alert-danger' : 'alert-info'}`}>{mensaje}</div>}

          <div className="d-grid">
            <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: '#fff' }}>
              Hacer Reserva
            </button>
          </div>
        </form>
      </div>

      <ListaReservasUsuario actualizarTrigger={recargarReservas} />
      <Footer />

      {/* Modal de confirmación */}
      {mostrarModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Reserva</h5>
                  <button type="button" className="btn-close" onClick={cerrarModal}></button>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro de que quieres hacer esta reserva?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                  <button className="btn btn-primary" onClick={confirmarReserva}>Confirmar</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default ReservaPage;
