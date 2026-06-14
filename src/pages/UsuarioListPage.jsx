import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MarcaTable from "../components/UsuarioTable";

import {
  obtenerTodasLosUsuarios,
  eliminarUsuario
} from "../services/usuarioServices";

function UsuarioListPage() {
  const navigate = useNavigate();

  const MAX_FILTRO_ID = 10;
  const MAX_FILTRO_NOMBRE_MARCA = 50;

  const [marcas, setMarcas] = useState([]);
  const [filtroId, setFiltroId] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarMarcas = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const datos = await obtenerTodasLasMarcas();

      if (Array.isArray(datos)) {
        setMarcas(datos);
      } else {
        setMarcas([]);
        setError("El backend respondió, pero no devolvió una lista válida de marcas.");
      }
    } catch (errorPeticion) {
      console.error("Error al cargar marcas:", errorPeticion);
      setMarcas([]);
      setError("No se pudieron cargar las marcas desde el backend.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const manejarCambioFiltroId = (evento) => {
    const valor = evento.target.value;
    const soloNumeros = valor.replace(/\D/g, "");

    if (soloNumeros.length <= MAX_FILTRO_ID) {
      setFiltroId(soloNumeros);
    }
  };

  const manejarCambioFiltroNombre = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_NOMBRE_MARCA) {
      setFiltroNombre(valor);
    }
  };

  const textoFiltroId = filtroId.trim();
  const textoFiltroNombre = filtroNombre.trim().toLowerCase();

  const marcasFiltradas = marcas.filter((marca) => {
    const coincideId =
      textoFiltroId === ""
        ? true
        : marca.idMarca.toString().includes(textoFiltroId);

    const coincideNombre =
      textoFiltroNombre === ""
        ? true
        : marca.nombreMarca.toLowerCase().includes(textoFiltroNombre);

    return coincideId && coincideNombre;
  });

  const manejarAgregarMarca = () => {
    navigate("/marcas/agregar");
  };

  const manejarEditarMarca = (idMarca) => {
    navigate(`/marcas/editar/${idMarca}`);
  };

  const manejarEliminarMarca = async (idMarca) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar la marca con ID ${idMarca}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");
      setMensaje("");

      await eliminarMarca(idMarca);
      setMensaje("Marca eliminada correctamente.");
      await cargarMarcas();
    } catch (errorPeticion) {
      console.error("Error al eliminar marca:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      setError(
        mensajeBackend !== ""
          ? `No se pudo eliminar la marca. ${mensajeBackend}`
          : "No se pudo eliminar la marca. Puede tener vehículos asociados."
      );
    }
  };

  const limpiarFiltros = () => {
    setFiltroId("");
    setFiltroNombre("");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-0">Gestión de Marcas</h2>
          <small className="text-muted">
            Listar, filtrar, editar y eliminar marcas.
          </small>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={manejarAgregarMarca}
        >
          Agregar marca
        </button>
      </div>

      <div className="card-body">
        {mensaje !== "" && <div className="alert alert-success">{mensaje}</div>}
        {error !== "" && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="filtroIdMarca" className="form-label">
              Filtrar por ID
            </label>

            <input
              id="filtroIdMarca"
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Ejemplo: 1"
              value={filtroId}
              onChange={manejarCambioFiltroId}
              maxLength={MAX_FILTRO_ID}
            />

            <div className="form-text">
              {filtroId.length}/{MAX_FILTRO_ID} caracteres
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="filtroNombreMarca" className="form-label">
              Filtrar por nombre de marca
            </label>

            <input
              id="filtroNombreMarca"
              type="text"
              className="form-control"
              placeholder="Ejemplo: Toyota"
              value={filtroNombre}
              onChange={manejarCambioFiltroNombre}
              maxLength={MAX_FILTRO_NOMBRE_MARCA}
            />

            <div className="form-text">
              {filtroNombre.length}/{MAX_FILTRO_NOMBRE_MARCA} caracteres
            </div>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={limpiarFiltros}
            >
              Limpiar
            </button>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={cargarMarcas}
            >
              Recargar
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="alert alert-info mb-0">
            Cargando marcas desde el backend...
          </div>
        ) : (
          <MarcaTable
            marcas={marcasFiltradas}
            onEditar={manejarEditarMarca}
            onEliminar={manejarEliminarMarca}
          />
        )}
      </div>
    </div>
  );
}

export default UsuarioListPage;