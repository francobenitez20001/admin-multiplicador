import React from 'react';
import {Link} from 'react-router-dom';
const FormAddCategoria = (props) => {
    return (
        <div className="container mt-3">
            <Link className="btn btn-warning mb-2" to="/categorias">Volver al listado</Link>
            <h4>Nueva categoria</h4>
            <form onSubmit={props.handleSubmit} id="formNuevaCategoria">
                <div className="row my-3">
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Categoria</div>
                        </div>
                        <input type="text" className="form-control" name="categoria" onChange={props.handleChange} value={props.form.categoria}/>
                    </div>
                    <div className="col-12 col-md-6 input-group">
                        <div className="input-group-prepend">
                            <div className="input-group-text">Icono</div>
                        </div>
                        <input type="file" className="form-control" name="icono"/>
                    </div>
                </div>
                <input type="submit" className="btn btn-info" style={{float:'right'}} value="Agregar"/>
            </form>
        </div>
    );
}
 
export default FormAddCategoria;