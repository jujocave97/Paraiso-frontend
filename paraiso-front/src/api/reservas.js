import axiosInstance from './axiosInstance';

// ✅ POST /reservas/reservar
export const reservarTarta = async (reservaDTO) => {
  const res = await axiosInstance.post('/api/reservas/reservar', reservaDTO);
  return res.data;
};

// ✅ GET /reservas/ — reservas de un usuario (autenticado)
export const obtenerReservasDeUsuario = async () => {
  const res = await axiosInstance.get(`/api/reservas/mis-reservas`);
  return res.data;
};

// ✅ GET /reservas/ — solo ADMIN
export const obtenerTodasLasReservas = async () => {
  const res = await axiosInstance.get('api/reservas/');
  return res.data;
};

// ✅ PUT /reservas/{id}/estado/{estado} — solo ADMIN
export const cambiarEstadoReserva = async (id, estado) => {
  const res = await axiosInstance.put(`/api/reservas/${id}/estado/${estado}`);
  return res.data;
};

// ✅ DELETE /reservas/{reservaID} — solo ADMIN
export const eliminarReserva = async (reservaID) => {
  const res = await axiosInstance.delete(`/api/reservas/${reservaID}`);
  return res.data;
};

export const eliminarReservaRolUsario = async (reservaID) => {
  const res = await axiosInstance.delete(`/api/reservas/eliminarReserva/${reservaID}`);
  return res.data;
};


// ✅ GET /reservas/usuario/{nombre} — solo ADMIN, busca reservas por nombre de usuario
export const obtenerReservasPorNombreUsuario = async (email) => {
  const res = await axiosInstance.get(`/api/reservas/${encodeURIComponent(email)}`);
  return res.data;
};