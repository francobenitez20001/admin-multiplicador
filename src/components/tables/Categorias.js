import React from 'react';

const TablaCategorias = (props) => {
    return (
        <section className="mt-3">
            <h4 className="ml-2 mb-3">Categorias</h4>
            <table className="table text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Icono</th>
                        <th scope="col">
                            <button className="btn btn-info">Nueva</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
 
export default TablaCategorias;