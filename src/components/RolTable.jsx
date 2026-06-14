function RolTable({ rol, onEditar, onEliminar}){

    if (!Array.isArray(rol) || rol.length === 0){
        return (
            <div className="alert alert-warning mb-0">
                no hay roles para mostar
            </div>
        );
    }

    return(
        <div className="table-resposive"    >
            <table className="table table-striped table-bordered table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">ID rol</th>
                        <th scope="col">tipo rol</th>
                        <th scope="col">ID usuario</th>
                        <th scope="col" className="text-center">
                            acciones
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rol.map((rol) => (
                        <tr key={rol.id_rol}>
                            <td>{rol.tipo_rol}</td>
                            <td>{rol.usuario?.primer_nombre || "sin usuario"}</td>

                            <td className="text-center">
                                <div className="d-flex justify-content-center gap-2">
                                    <button
                                        type="button"
                                        className="btn btn-warning btn-sm"
                                        onClick={() => onEditar(rol.id_rol)}
                                    >
                                        editar
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => onEliminar(rol.id_rol)}
                                    >
                                        eliminar
                                    </button>
                                </div>
                            </td>
                      </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RolTable;