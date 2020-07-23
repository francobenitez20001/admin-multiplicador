import React from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Layout from "./Layout";

import Home from '../pages/home/Home';
import Login from './Login/Login';


const App = () => {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/login" component={Login}/>
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}
 
export default App;