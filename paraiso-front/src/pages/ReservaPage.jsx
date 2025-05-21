import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { reservarTarta } from '../api/reservas';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ReservaPage = () => {
  const [tartas, setTartas] = useState([]);
  const [cakeId, setCakeId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [comentario, setComentario] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const cargarTartas = async () => {
      try {
        const res = await axiosInstance.get('/cakes/');
        setTartas(res.data);
      } catch (err) {
        setMensaje('❌ Error al cargar las tartas.');
      }
    };
    cargarTartas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reserva = {
        cakeId,
        cantidad,
        comentario
      };
      await reservarTarta(reserva);
      setMensaje('🎉 ¡Reserva realizada con éxito!');
      setCakeId('');
      setCantidad(1);
      setComentario('');
    } catch (err) {
      setMensaje('❌ Error al realizar la reserva.');
    }
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
              className="form-select"
              value={cakeId}
              onChange={(e) => setCakeId(e.target.value)}
              required
            >
              <option value="">-- Elige una tarta --</option>
              {tartas.map((tarta) => (
                <option key={tarta.id} value={tarta.id}>
                  {tarta.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              className="form-control"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Comentario (opcional)</label>
            <textarea
              className="form-control"
              placeholder="Instrucciones adicionales..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>

          {mensaje && <div className="alert alert-info">{mensaje}</div>}

          <div className="d-grid">
            <button type="submit" className="btn" style={{ backgroundColor: '#40d9c6', color: '#fff' }}>
              Hacer Reserva
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ReservaPage;
