import React from 'react';
import {Link} from 'react-router-dom';
const TablaAutores = (props) => {
    return ( 
        <section className="mt-3">
            <h4 className="ml-2 mb-3">Autores</h4>
            <table className="table text-center">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Twitter</th>
                        <th scope="col">
                            <Link to="autor/add" className="btn btn-info">Nuevo</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.autores.map(autor=>(
                        <tr key={autor.idAutor}>
                            <th scope="row"><img src={autor.foto} alt="d" className="img-fluid" style={{borderRadius:"50%",height:"30px"}}/></th>
                            <td>{autor.nombre}</td>
                            <td>{autor.apellido}</td>
                            <td>{autor.twitter}</td>
                            <td>
                                <Link to={{pathname:`/autor/edit/${autor.idAutor}`}} className="btn btn-warning mr-2">Modificar</Link>
                                <button onClick={()=>props.deleteAutor(autor.idAutor)} className="btn btn-danger">Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
 
export default TablaAutores;