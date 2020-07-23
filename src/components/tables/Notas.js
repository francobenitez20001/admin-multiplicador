import React from 'react';

const TablaNotas = (props) => {
    return (
        <section className="mt-3">
            <h4 className="ml-2 mb-3">Notas</h4>
            <table className="table text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">titulo</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">Imagen</th>
                        <th scope="col">
                            <button className="btn btn-info">Nueva</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
}
 
export default TablaNotas;