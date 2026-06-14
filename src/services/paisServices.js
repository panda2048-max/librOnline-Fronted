import api from "./axiosConfig";

export const obtenerTodosLosPaises = async () => {
    try {
        const respuesta = await api.get("/pais");
        return respuesta.data;
    } catch (error){
        console.error("Error al obtener todos los paises: ", error);
        throw error;
    }
    
};

export const obtenerPaisPorId = async (id_pais) => {
    try{
        const idPaisNumerico = parseInt(id_pais);
        const respuesta = await api.get(`/pais/${idPaisNumerico}`);
        return respuesta.data
    } catch (error){
        console.error("Error al obtener los paises :", error);
        throw error;
    }
};

export const agregarPais = async (nuevaPais) => {
  try {
    const datos_pais ={
        nombre_pais: nuevaPais.nombre_pais
    };

    const respuesta = await api.post("/pais", datos_pais);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar el pais:", error);
    throw error;
  }
};

export const actualizarPais = async (PaisActualizada) => {
  try {
    const datos_pais = {
      id_pais: parseInt(PaisActualizada.id_pais),
      nombre_pais: PaisActualizada.nombre_pais
    };

    const respuesta = await api.put("/pais", datos_pais);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar el pais:", error);
    throw error;
  }
};

export const eliminarPais = async (id_pais) => {
    try {
        const idPaisNumerico = parseInt(id_pais);

        const respuesta = await api.delete(`/pais/${idPaisNumerico}`);
        return respuesta.data;
    } catch (error) {
        console.error("error al eliminar el pais: ", error)
        throw error;
    }
};