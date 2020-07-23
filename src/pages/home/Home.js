import React from 'react';
import {Link} from 'react-router-dom';
const Home = () => {
    return (
        <div className="container mt-5">
            <div className="list-group">
                <Link to="/" className="list-group-item list-group-item-action">Panel de administracion de Autores</Link>
                <Link to="/" className="list-group-item list-group-item-action">Panel de administracion de Notas</Link>
                <Link to="/" className="list-group-item list-group-item-action">Panel de administracion de Categorías</Link>
            </div>
        </div>
    );
}
 
export default Home;