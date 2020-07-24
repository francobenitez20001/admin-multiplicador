import React from 'react';
import {Link} from 'react-router-dom';
const FormAddNota = (props) => {
    return (
        (props.autores === undefined || props.categorias === undefined)?null:
        <div className="container mt-3">
            <Link className="btn btn-warning mb-2" to="/notas">Volver al listado</Link>
            <h4>Nueva nota</h4>
            <form onSubmit={props.handleSubmit} id="formAgregarNota">
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Autor</div>
                        </div>
                        <select className="form-control" name="idAutor" onChange={props.handleChange} defaultValue={props.form.idAutor}>
                            <option value="">Seleccione autor</option>
                            {props.autores.map(autor=>(
                                <option key={autor.idAutor} value={autor.idAutor}>{autor.nombre} {autor.apellido}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Categoria</div>
                        </div>
                        <select className="form-control" name="idCategoria" onChange={props.handleChange} defaultValue={props.form.idCategoria}>
                            <option value="">Seleccione categoria</option>
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
                        <input type="text" className="form-control" name="titulo" onChange={props.handleChange} value={props.form.titulo}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Fecha</div>
                        </div>
                        <input type="date" className="form-control" name="fecha" onChange={props.handleChange} value={props.form.fecha.substr(0,10)}/>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <textarea name="resumen" defaultValue={props.form.resumen} onChange={props.handleChange} className="form-control" rows="10"></textarea>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <textarea name="contenido" defaultValue={props.form.contenido} onChange={props.handleChange} className="form-control" rows="50"></textarea>
                    </div>
                </div>
                <div className="row my-3">
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
                        <select className="form-control" name="estado" defaultValue={props.form.estado} onChange={props.handleChange}>
                            <option value="1">Disponible</option>
                            <option value="0">No disponible</option>
                        </select>
                    </div>
                </div>
                <input type="submit" className="btn btn-info" style={{float:'right'}} value="Actualizar"/>
            </form>
        </div>
    );
}
 
export default FormAddNota;