import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { reservarTarta } from '../api/reservas';

const FormularioReserva = () => {
  const [fecha, setFecha] = useState('');
  const [comentario, setComentario] = useState('');
  const [tartaSeleccionada, setTartaSeleccionada] = useState('');
  const [tartas, setTartas] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [errores, setErrores] = useState({});

  useEffect(() => {
    const cargarTartas = async () => {
      try {
        const res = await axiosInstance.get('/cakes/');
        setTartas(res.data);
      } catch {
        setError('❌ No se pudieron cargar las tartas');
      }
    };
    cargarTartas();
  }, []);

  // Validación local por campo
  const validarCampo = (name, value) => {
    switch (name) {
      case 'tartaSeleccionada':
        if (!value) return 'Debes seleccionar una tarta';
        return '';
      case 'fecha':
        if (!value) return 'Debes seleccionar una fecha';
        if (new Date(value) < new Date().setHours(0, 0, 0, 0)) return 'La fecha no puede ser pasada';
        return '';
      case 'comentario':
        if (value.length > 200) return 'En el comentario tambien puedes indicar tus preferencias sobre la tarta';
        return '';
      default:
        return '';
    }
  };

  // Validar todo el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};
    nuevosErrores.tartaSeleccionada = validarCampo('tartaSeleccionada', tartaSeleccionada);
    nuevosErrores.fecha = validarCampo('fecha', fecha);
    nuevosErrores.comentario = validarCampo('comentario', comentario);

    // Filtrar solo errores no vacíos
    Object.keys(nuevosErrores).forEach(key => {
      if (!nuevosErrores[key]) delete nuevosErrores[key];
    });

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');
    setErrores({});

    if (!validarFormulario()) {
      setError('Por favor corrige los errores antes de enviar.');
      return;
    }

    const confirmar = window.confirm('¿Estás seguro de que quieres hacer una reserva?');
    if (!confirmar) return;

    try {
      const reserva = {
        cakeId: tartaSeleccionada,
        fecha,
        comentario
      };
      await reservarTarta(reserva);
      setMensaje('🎉 ¡Reserva realizada con éxito!');
      setTartaSeleccionada('');
      setFecha('');
      setComentario('');
      setErrores({});
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrores(err.response.data);
      } else {
        setError('❌ Hubo un error al reservar.');
      }
    }
  };

  // Actualizar valor y validar campo en tiempo real
  const handleChange = (name, value) => {
    switch (name) {
      case 'tartaSeleccionada':
        setTartaSeleccionada(value);
        setErrores(prev => ({ ...prev, tartaSeleccionada: validarCampo(name, value) }));
        break;
      case 'fecha':
        setFecha(value);
        setErrores(prev => ({ ...prev, fecha: validarCampo(name, value) }));
        break;
      case 'comentario':
        setComentario(value);
        setErrores(prev => ({ ...prev, comentario: validarCampo(name, value) }));
        break;
      default:
        break;
    }
    setError('');
    setMensaje('');
  };

  return (
    <form onSubmit={manejarEnvio} className="p-4 rounded shadow" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff' }}>
      <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>Reservar Tarta</h2>

      <div className="mb-3">
        <label className="form-label">Selecciona una Tarta</label>
        <select
          className={`form-select ${errores.tartaSeleccionada ? 'is-invalid' : ''}`}
          value={tartaSeleccionada}
          onChange={e => handleChange('tartaSeleccionada', e.target.value)}
          required
        >
          <option value="">-- Elige una tarta --</option>
          {tartas.map((tarta) => (
            <option key={tarta.id} value={tarta.id}>
              {tarta.nombre}
            </option>
          ))}
        </select>
        {errores.tartaSeleccionada && <div className="invalid-feedback">{errores.tartaSeleccionada}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className={`form-control ${errores.fecha ? 'is-invalid' : ''}`}
          value={fecha}
          onChange={e => handleChange('fecha', e.target.value)}
          required
        />
        {errores.fecha && <div className="invalid-feedback">{errores.fecha}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Comentario</label>
        <textarea
          className={`form-control ${errores.comentario ? 'is-invalid' : ''}`}
          value={comentario}
          onChange={e => handleChange('comentario', e.target.value)}
          maxLength={200}
          placeholder="Opcional (máx 200 caracteres)"
        />
        {errores.comentario && <div className="invalid-feedback">{errores.comentario}</div>}
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="d-grid">
        <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: '#fff' }}>
          Reservar
        </button>
      </div>
    </form>
  );
};

export default FormularioReserva;
