import React from 'react';
import {Link} from 'react-router-dom';
const FormEditAutor = (props) => {
    return (
        (props.autor === undefined)?null:
        <div className="container mt-3">
            <Link className="btn btn-warning mb-2" to="/autores">Volver al listado</Link>
            <h4>Modificación de Autor</h4>
            <form onSubmit={props.handleSubmit} id="formEditarAutor">
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Nombre</div>
                        </div>
                        <input type="text" className="form-control" name="nombre" value={props.autor.nombre} onChange={props.handleChange}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Apellido</div>
                        </div>
                        <input type="text" className="form-control" name="apellido" value={props.autor.apellido} onChange={props.handleChange}/>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <textarea name="descripcion" defaultValue={props.autor.descripcion} onChange={props.handleChange} className="form-control" rows="15"></textarea>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Twitter</div>
                        </div>
                        <input type="text" className="form-control" name="twitter" value={props.autor.twitter} onChange={props.handleChange}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Avatar</div>
                        </div>
                        <input type="file" className="form-control" name="avatar"/>
                    </div>
                </div>
                <input type="submit" className="btn btn-info" style={{float:'right'}} value="Actualizar"/>
            </form>
        </div>
    );
}
 
export default FormEditAutor;