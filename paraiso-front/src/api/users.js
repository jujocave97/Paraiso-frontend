import axiosInstance from './axiosInstance';

// ✅ GET /api/users/ — obtener todos los usuarios (admin)
export const obtenerTodosLosUsuarios = async () => {
  const res = await axiosInstance.get('api/users/');
  return res.data;
};

// ✅ GET /api/users/{email} — obtener usuario por email (admin o mismo usuario)
export const obtenerUsuarioPorEmail = async (email) => {
  const res = await axiosInstance.get(`api/users/${encodeURIComponent(email)}`);
  return res.data;
};

// ✅ PUT /api/users/{email} — actualizar usuario (admin o mismo usuario)
export const actualizarUsuario = async (email, userInfoDTO) => {
  const res = await axiosInstance.put(`api/users/${encodeURIComponent(email)}`, userInfoDTO);
  return res.data;
};

// ✅ DELETE /api/users/{email} — eliminar usuario (admin o mismo usuario)
export const eliminarUsuario = async (email) => {
  const res = await axiosInstance.delete(`api/users/${encodeURIComponent(email)}`);
  return res.data;
};
