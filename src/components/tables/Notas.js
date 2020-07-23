import React from 'react';
import {Link} from 'react-router-dom';

const TablaNotas = (props) => {
    return (
        <section className="mt-3">
            <h4 className="ml-2 mb-3">Notas</h4>
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">titulo</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">
                            <button className="btn btn-info">Nueva</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.notas.map(nota=>(
                        <tr key={nota.idNota}>
                            <th scope="row">{nota.titulo}</th>
                            <td>{nota.nombre} {nota.apellido}</td>
                            <td>{nota.categoria}</td>
                            <td>
                                <Link to={{pathname:`/nota/edit/${nota.idNota}`}} className="btn btn-warning mr-2">Modificar</Link>
                                <button onClick={()=>props.deleteNota(nota.idNota)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
 
export default TablaNotas;