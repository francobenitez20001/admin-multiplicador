import React from 'react';
import {Link} from 'react-router-dom';
const FormEditNota = (props) => {
    return (
        (props.nota === undefined || props.autores === undefined || props.categorias === undefined )?null:
        <div className="container mt-3">
            <Link className="btn btn-warning mb-2" to="/notas">Volver al listado</Link>
            <h4>Modificación de nota</h4>
            <form onSubmit={props.handleSubmit} id="formEditarNota">
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Autor</div>
                        </div>
                        <select className="form-control" name="idAutor" onChange={props.handleChange} defaultValue={props.nota.idAutor}>
                            {props.autores.map(autor=>(
                                <option key={autor.idAutor} value={autor.idAutor}>{autor.nombre} {autor.apellido}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Categoria</div>
                        </div>
                        <select className="form-control" name="idCategoria" onChange={props.handleChange} defaultValue={props.nota.idCategoria}>
                            {props.categorias.map(categoria=>(
                                <option key={categoria.idCategoria} value={categoria.idCategoria}>{categoria.categoria}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Titulo</div>
                        </div>
                        <input type="text" className="form-control" name="titulo" onChange={props.handleChange} value={props.nota.titulo}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Fecha</div>
                        </div>
                        <input type="date" className="form-control" name="fecha" onChange={props.handleChange} value={props.nota.fecha.substr(0,10)}/>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <textarea name="resumen" defaultValue={props.nota.resumen} onChange={props.handleChange} className="form-control" rows="10"></textarea>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <textarea name="contenido" defaultValue={props.nota.contenido} onChange={props.handleChange} className="form-control" rows="50"></textarea>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="alert alert-warning text-center w-100"><b>Atención:</b> En el caso de no querer modificar la imagen principal de la nota, deje vacio el input de archivo</div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Foto</div>
                        </div>
                        <input type="file" className="form-control" name="header"/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Estado</div>
                        </div>
                        <select className="form-control" name="estado" defaultValue={props.nota.estado} onChange={props.handleChange}>
                            <option value="1">Disponible</option>
                            <option value="0">No disponible</option>
                        </select>
                    </div>
                    <div className="col-12 col-md-6 mt-2">
                        <img src={props.nota.header} className="img-fluid" alt={props.nota.titulo}/>
                    </div>
                </div>
                <input type="submit" className="btn btn-info mb-4" style={{float:'right'}} value="Actualizar"/>
            </form>
            <div className="wrapper_resource my-4">
                <h3 className="mt-3">Archivos de la nota </h3>
                <form className="form-group" id="form-imagenes">
                    <button type="button" className="btn btn-success" onClick={props.cargarMasImagenes}>Agregar</button>
                    <div className="row my-5">
                        <ul className="list-group col-12">
                            {props.resources.length===0?<div className="alert alert-warning">Sin archivos</div>:
                            props.resources.map(archivo=>(
                                <li key={archivo.idArchivo} className="list-group-item">
                                    <img src={archivo.archivo} height="40px" width="40px"/>
                                    <i style={{float:'right',cursor:'pointer'}} onClick={()=>props.eliminarImagen(archivo.idArchivo,archivo.archivo)}  className="icono-delete mx-2 pt-2 fas fa-trash-alt"></i>
                                    <i style={{float:'right',cursor:'pointer'}} onClick={()=>props.modificarImagen(archivo.idArchivo)}  className="icono-update mx-2 pt-2 fas fa-pen"></i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    );
}
 
export default FormEditNota;