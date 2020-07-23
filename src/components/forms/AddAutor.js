import React from 'react';
import {Link} from 'react-router-dom';

const FormAddAutor = (props) => {
    return (
        <div className="container mt-3">
            <Link className="btn btn-warning mb-2" to="/autores">Volver al listado</Link>
            <h4>Nuevo Autor</h4>
            <form onSubmit={props.handleSubmit} id="formEditarAutor">
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Nombre</div>
                        </div>
                        <input required type="text" className="form-control" name="nombre" value={props.form.nombre} onChange={props.handleChange}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Apellido</div>
                        </div>
                        <input required type="text" className="form-control" name="apellido" value={props.form.apellido} onChange={props.handleChange}/>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12">
                        <textarea required name="descripcion" defaultValue={props.form.descripcion} onChange={props.handleChange} className="form-control" rows="15"></textarea>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Twitter</div>
                        </div>
                        <input required type="text" className="form-control" name="twitter" value={props.form.twitter} onChange={props.handleChange}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Avatar</div>
                        </div>
                        <input required type="file" className="form-control" name="avatar"/>
                    </div>
                </div>
                <input type="submit" className="btn btn-info" style={{float:'right'}} value="Actualizar"/>
            </form>
        </div>
    );
}
 
export default FormAddAutor;