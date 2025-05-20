// src/components/FormularioReserva.jsx
import React, { useState, useEffect } from 'react';
import { tartas as listaTartas } from '../data/tartas'; // O usa obtenerTartas si cargas desde API

const FormularioReserva = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [tartaSeleccionada, setTartaSeleccionada] = useState('');
  const [tartas, setTartas] = useState([]);

  useEffect(() => {
    const cargarTartas = async () => {
        const datos = await obtenerTartas();
        setTartas(datos);
    };
    cargarTartas();
  }, []);

  const manejarEnvio = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario
    console.log('Reserva:', { nombre, fecha, tartaSeleccionada });
  };

  return (
    <form onSubmit={manejarEnvio}>
      <h2>Hacer una Reserva</h2>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Fecha de Reserva</label>
        <input
          type="date"
          className="form-control"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Selecciona una Tarta</label>
        <select
          className="form-select"
          value={tartaSeleccionada}
          onChange={(e) => setTartaSeleccionada(e.target.value)}
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

      <button type="submit" className="btn btn-primary">
        Reservar
      </button>
    </form>
  );
};

export default FormularioReserva;
