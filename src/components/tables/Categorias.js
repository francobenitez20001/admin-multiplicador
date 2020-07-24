import React from 'react';
import {Link} from 'react-router-dom';

const TablaCategorias = (props) => {
    return (
        <section className="mt-3">
            <h4 className="ml-2 mb-3">Categorias</h4>
            <table className="table text-center table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Icono</th>
                        <th scope="col">Categoria</th>
                        <th scope="col">
                            <Link to="/categoria/add" className="btn btn-info">Nueva</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.categorias.map(categoria=>(
                        <tr key={categoria.idCategoria}>
                            <th scope="row"><img src={categoria.icono} alt="d" className="" style={{borderRadius:"50%",height:"40px",width:"40px"}}/></th>
                            <td>{categoria.categoria}</td>
                            <td>
                                <Link to={{pathname:`/categoria/edit/${categoria.idCategoria}`}} className="btn btn-warning mr-2">Modificar</Link>
                                <button onClick={()=>props.deleteCategoria(categoria.idCategoria)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
 
export default TablaCategorias;