import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { reservarTarta } from '../api/reservas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ListaReservasUsuario from '../components/ListaReservasUsuario';

const ReservaPage = () => {
  // Estados del formulario y lógica
  const [tartas, setTartas] = useState([]); // Lista de tartas disponibles
  const [cakeId, setCakeId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarPago, setMostrarPago] = useState(false); // Nuevo estado para mostrar el "pago"
  const [recargarReservas, setRecargarReservas] = useState(0);
  const [errores, setErrores] = useState({});

  // Carga de tartas al iniciar
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

  // Validaciones de campos
  const validarCampo = (name, value) => {
    switch (name) {
      case 'cakeId':
        if (!value) return 'Debes seleccionar una tarta';
        return '';
      case 'cantidad':
        if (!value) return 'La cantidad es obligatoria';
        if (isNaN(value) || Number(value) < 1) return 'Debe ser un número mayor o igual a 1';
        return '';
      case 'comentario':
        if (value.length > 100) return 'Máximo 100 caracteres';
        return '';
      default:
        return '';
    }
  };

  // Validación global del formulario
  const validarFormulario = () => {
    const nuevosErrores = {
      cakeId: validarCampo('cakeId', cakeId),
      cantidad: validarCampo('cantidad', cantidad),
      comentario: validarCampo('comentario', comentario),
    };
    Object.keys(nuevosErrores).forEach(key => {
      if (!nuevosErrores[key]) delete nuevosErrores[key];
    });
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Modal de confirmación
  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  // Al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    setMensaje('');
    setErrores({});
    if (!validarFormulario()) {
      setMensaje('Corrige los errores.');
      return;
    }
    abrirModal();
  };

  // Paso 2: Mostrar "plataforma de pago" simulada
  const simularPago = () => {
    cerrarModal();
    setMostrarPago(true);
  };

  // Paso 3: Confirmar reserva tras "pago"
  const confirmarReserva = async () => {
    setMostrarPago(false);
    setMensaje('');
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
      if (err.response?.status === 400) {
        setErrores(err.response.data);
      } else {
        setMensaje('❌ Error al reservar.');
      }
    }
  };

  // Control de inputs y errores en tiempo real
  const handleChange = (name, value) => {
    switch (name) {
      case 'cakeId':
        setCakeId(value);
        break;
      case 'cantidad':
        setCantidad(value);
        break;
      case 'comentario':
        setComentario(value);
        break;
    }
    setErrores(prev => ({ ...prev, [name]: validarCampo(name, value) }));
    setMensaje('');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      {/* Formulario */}
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
                <option key={tarta.id} value={tarta.id}>{tarta.nombre}</option>
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
              value={comentario}
              onChange={e => handleChange('comentario', e.target.value)}
              maxLength={200}
            />
            {errores.comentario && <div className="invalid-feedback">{errores.comentario}</div>}
          </div>

          {/* Mensaje de error o éxito */}
          {mensaje && <div className={`alert ${Object.keys(errores).length ? 'alert-danger' : 'alert-info'}`}>{mensaje}</div>}

          <div className="d-grid">
            <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: '#fff' }}>
              Hacer Reserva
            </button>
          </div>
        </form>
      </div>

      {/* Lista de reservas del usuario */}
      <ListaReservasUsuario actualizarTrigger={recargarReservas} />
      <Footer />

      {/* Modal de confirmación antes del "pago" */}
      {mostrarModal && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmar Reserva</h5>
                  <button className="btn-close" onClick={cerrarModal}></button>
                </div>
                <div className="modal-body">
                  <p>¿Estás seguro? Tras la confirmación, pasarás a pagar.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                  <button className="btn btn-primary" onClick={simularPago}>Pagar</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Simulación de pasarela de pago */}
      {mostrarPago && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content text-center">
                <div className="modal-header">
                  <h5 className="modal-title">Simulación de Pago</h5>
                </div>
                <div className="modal-body">
                  <p>Simulando una plataforma de pago...</p>
                  <p>Haz clic en "Finalizar Pago" para confirmar.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-success" onClick={confirmarReserva}>Finalizar Pago</button>
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
