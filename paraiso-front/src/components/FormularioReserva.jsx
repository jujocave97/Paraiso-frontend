import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { reservarTarta } from '../api/reservas';

const FormularioReserva = () => {
  const [fecha, setFecha] = useState('');
  const [comentario, setComentario] = useState('');
  const [tartaSeleccionada, setTartaSeleccionada] = useState('');
  const [tartas, setTartas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarTartas = async () => {
      const res = await axiosInstance.get('/cakes/');
      setTartas(res.data);
    };
    cargarTartas();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensaje('');
    try {
      const reserva = {
        cakeId: tartaSeleccionada,
        fecha,
        comentario
      };
      await reservarTarta(reserva);
      setMensaje('🎉 ¡Reserva realizada con éxito!');
    } catch (err) {
      setMensaje('❌ Hubo un error al reservar.');
    }
  };

  return (
    <form onSubmit={manejarEnvio} className="p-4 rounded shadow" style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#fff' }}>
      <h2 className="text-center mb-4" style={{ color: '#40d9c6' }}>Reservar Tarta</h2>

      <div className="mb-3">
        <label className="form-label">Selecciona una Tarta</label>
        <select className="form-select" value={tartaSeleccionada} onChange={(e) => setTartaSeleccionada(e.target.value)} required>
          <option value="">-- Elige una tarta --</option>
          {tartas.map((tarta) => (
            <option key={tarta.id} value={tarta.id}>
              {tarta.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Comentario</label>
        <textarea
          className="form-control"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />
      </div>

      {mensaje && <div className="alert alert-info">{mensaje}</div>}

      <div className="d-grid">
        <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: '#fff' }}>
          Reservar
        </button>
      </div>
    </form>
  );
};

export default FormularioReserva;
