import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Layout from "./Layout";

import Home from '../pages/home/Home';
import Login from './Login/Login';
import Autores from '../pages/autores/Autores';
import Notas from '../pages/notas/Notas';
import Categorias from '../pages/categorias/Categorias';
import EditAutor from '../pages/autores/Edit';
import NewAutor from '../pages/autores/New';
import EditNota from '../pages/notas/Edit';
import NewNota from '../pages/notas/New';


const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/autores" component={Autores}/>
                    <Route exact path="/autor/edit/:id" component={EditAutor}/>
                    <Route exact path="/autor/add" component={NewAutor}/>
                    <Route exact path="/notas" component={Notas}/>
                    <Route exact path="/nota/edit/:id" component={EditNota}/>
                    <Route exact path="/nota/add" component={NewNota}/>
                    <Route exact path="/categorias" component={Categorias}/>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}
 
export default App;