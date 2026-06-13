import api from "./axiosConfig";

export const obtenerTodosLosEmail = async () => {
    try {
        const respuesta = await api.get("/email");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todos los email: ", error);
        throw error;
    }
    
};

export const obtenerEmailPorId = async (id_email) => {
    try{
        const idEmailNumerico = parseInt(id_email);
        const respuesta = await api.get(`/email/${idEmailNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener el email :", error);
        throw error;
    }
};

export const agregarEmail = async (nuevaEmail) => {
  try {
    const datos_email ={
        email: nuevaEmail.email,
        id_usuarios: parseInt(nuevaEmail.id_usuario)
    }


    const respuesta = await api.post("/email", nuevaEmail);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar el email:", error);
    throw error;
  }
};

export const actualizarEmail = async (EmailActualizada) => {
  try {
    const datos_email = {
      id_email: parseInt(EmailActualizada.id_email),
      email: EmailActualizada.email,
      id_usuario: parseInt(EmailActualizada.id_usuario)
    };

    const respuesta = await api.put("/email", datos_email);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar el email:", error);
    throw error;
  }
};

export const eliminarEmail = async (id_email) => {
    try {
        const idEmailNumerico = parseInt(id_email);

        const respuesta = await api.delete(`/email/${idEmailNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar al email: ", error)
        throw error;
    }
};