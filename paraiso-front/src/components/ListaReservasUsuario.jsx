import React, { useEffect, useState } from 'react';
import { obtenerReservasDeUsuario } from '../api/reservas';
import { eliminarReservaRolUsario } from '../api/reservas';


const ListaReservasUsuario = ({actualizarTrigger}) => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarReservas = async () => {
      try {
        const data = await obtenerReservasDeUsuario();
        setReservas(data);
      } catch (err) {
        console.error(err);
        setError('❌ No se pudieron cargar las reservas');
      }
    };

    cargarReservas();
  }, [actualizarTrigger]);

  if (error)
    return (
      <div className="container my-4">
        <div className="alert alert-danger mx-auto" style={{ maxWidth: '600px' }}>
          {error}
        </div>
      </div>
    );

  const handleEliminar = async (reservaID) => {
      try {
        await eliminarReservaRolUsario(reservaID);
        setReservas(reservas.filter((reserva) => reserva.id !== reservaID));
      } catch (error) {
        console.error('❌ Error al eliminar la reserva:', error);
      }
  };


  return (
    <div className="container my-4">
      <h3
        className="mb-4 text-center"
        style={{ color: '#40d9c6', fontWeight: '600' }}
      >
        Mis Reservas
      </h3>

      {reservas.length === 0 ? (
        <p className="text-center text-muted">No tienes reservas todavía.</p>
      ) : (
        <ul
          className="list-group mx-auto shadow rounded"
          style={{ maxWidth: '600px', backgroundColor: '#fff' }}
        >
          {reservas.map((reserva) => (
            <li key={reserva.id} className="list-group-item">
              <strong>{reserva.cakeId}</strong> – Cantidad: {reserva.cantidad}
              <br />
              Usuario: {reserva.usuario}
              <br />
              Fecha: {new Date(reserva.fechaReserva).toLocaleDateString()}
              <br />
              Estado: {reserva.estado}
              <br />
              Comentario: {reserva.comentario}

              <div className="d-flex justify-content-end">
                {reserva.estado === 'PENDIENTE' ? (
                  <button
                    className="btn btn-danger btn-sm mt-2"
                    onClick={() => handleEliminar(reserva.id)}
                  >
                    Eliminar
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-sm mt-2" disabled>
                    No se puede eliminar
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListaReservasUsuario;
