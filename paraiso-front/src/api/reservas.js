import axiosInstance from './axiosInstance';

// ✅ POST /reservas/reservar
export const reservarTarta = async (reservaDTO) => {
  const res = await axiosInstance.post('/reservas/reservar', reservaDTO);
  return res.data;
};

// ✅ GET /reservas/ — reservas de un usuario (autenticado)
export const obtenerReservasDeUsuario = async () => {
  const res = await axiosInstance.get(`/reservas/mis-reservas`);
  return res.data;
};

// ✅ GET /reservas/ — solo ADMIN
export const obtenerTodasLasReservas = async () => {
  const res = await axiosInstance.get('/reservas/');
  return res.data;
};

// ✅ PUT /reservas/{id}/estado/{estado} — solo ADMIN
export const cambiarEstadoReserva = async (id, estado) => {
  const res = await axiosInstance.put(`/reservas/${id}/estado/${estado}`);
  return res.data;
};

// ✅ DELETE /reservas/{reservaID} — solo ADMIN
export const eliminarReserva = async (reservaID) => {
  const res = await axiosInstance.delete(`/reservas/${reservaID}`);
  return res.data;
};

export const eliminarReservaRolUsario = async (reservaID) => {
  const res = await axiosInstance.delete(`/reservas/eliminarReserva/${reservaID}`);
  return res.data;
};
