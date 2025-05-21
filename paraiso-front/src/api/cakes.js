import axiosInstance from './axiosInstance';

// ✅ GET /cakes/ — listar todas las tartas (público o autenticado)
export const obtenerTartas = async () => {
  const res = await axiosInstance.get('/cakes/');
  return res.data;
};

// ✅ POST /cakes/create — crear una nueva tarta (solo ADMIN)
export const crearTarta = async (cakeDTO) => {
  const res = await axiosInstance.post('/cakes/create', cakeDTO);
  return res.data;
};

// ✅ PUT /cakes/{id} — actualizar tarta (solo ADMIN)
export const actualizarTarta = async (id, cakeDTO) => {
  const res = await axiosInstance.put(`/cakes/${id}`, cakeDTO);
  return res.data;
};

// ✅ DELETE /cakes/{id} — eliminar tarta (solo ADMIN)
export const eliminarTarta = async (id) => {
  const res = await axiosInstance.delete(`/cakes/${id}`);
  return res.data;
};
