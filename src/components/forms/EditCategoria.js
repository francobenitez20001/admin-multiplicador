import React from 'react';
import {Link} from 'react-router-dom';
const FormEditCategoria = (props) => {
    return (
        (props.categoria === undefined)?null:
        <div className="container mt-3">
            <Link className="btn btn-warning mb-2" to="/categorias">Volver al listado</Link>
            <h4>Modificación de categoria</h4>
            <form onSubmit={props.handleSubmit} id="formEditarCategoria">
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Categoria</div>
                        </div>
                        <input type="text" className="form-control" name="categoria" onChange={props.handleChange} value={props.categoria.categoria}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Icono</div>
                        </div>
                        <input type="file" className="form-control" name="icono"/>
                    </div>
                </div>
                <input type="submit" className="btn btn-info" style={{float:'right'}} value="Actualizar"/>
            </form>
        </div>
    );
}
 
export default FormEditCategoria;