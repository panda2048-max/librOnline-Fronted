import api from "./axiosConfig";

export const obtenerTodosLosUsuarios = async () => {
    try {
        const respuesta = await api.get("/usuario");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todos los usuarios: ", error);
        throw error;
    }
    
};

export const obtenerUsuariosPorId = async (id_usuario) => {
    try{
        const idUsuarioNumerico = parseInt(id_usuario);
        const respuesta = await api.get(`/usuario/${idUsuarioNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener el usuario :", error);
        throw error;
    }
};

export const agregarUsuario = async (nuevaUsuario) => {
  try {
    const datos_usuarios = {
      id_usuario: parseInt(nuevaUsuario.id_usuario),
      run_usuario: nuevaUsuario.run_usuario,
      primer_nombre: nuevaUsuario.primer_nombre,
      segundo_nombre: nuevaUsuario.segundo_nombre,
      ap_paterno: nuevaUsuario.ap_paterno,
      ap_materno: nuevaUsuario.ap_materno,
      telefono: nuevaUsuario.telefono
    }

    const respuesta = await api.post("/usuario", nuevaUsuario);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar el usuario:", error);
    throw error;
  }
};

export const actualizarusuario = async (usuarioActualizada) => {
  try {
    const datos_usuario = {
      id_usuario: parseInt(usuarioActualizada.id_usuario),
      run_usuario: usuarioActualizada.run_usuario,
      primer_nombre: usuarioActualizada.primer_nombre,
      segundo_nombre: usuarioActualizada.segundo_nombre,
      ap_paterno: usuarioActualizada.ap_paterno,
      ap_materno: usuarioActualizada.ap_materno,
      telefono: usuarioActualizada.telefono
    };

    const respuesta = await api.put("/usuario", datos_usuario);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw error;
  }
};

export const eliminarUsuario = async (id_usuario) => {
    try {
        const idUsuarioNumerico = parseInt(id_usuario);

        const respuesta = await api.delete(`/usuario/${idUsuarioNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar al usuario: ", error)
        throw error;
    }
};