import React from 'react';
import {Link} from 'react-router-dom';
import 'firebase/auth';
import {useFirebaseApp,useUser} from 'reactfire';
import './Navbar.css';
const Navbar = () => {
    const firebase = useFirebaseApp();
    const user = useUser();

    const logout = async()=>{
        await firebase.auth().signOut();
        window.location.assign('/login');
    }
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">Multiplicador</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/autores">Autores <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notas">Notas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/categorias">Categorias</Link>
                    </li>
                    <li className="nav-item">
                        {(user)?<button className="btn btn-danger" onClick={()=>logout()}>Salir</button>:<Link className="btn btn-info" to="/login">Iniciar sesión</Link>}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;