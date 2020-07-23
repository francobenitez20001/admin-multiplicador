import React, { useState } from 'react';
import Error from '../Error';
import 'firebase/auth';
import {useFirebaseApp,useUser} from 'reactfire';
import Loader from '../Loader/Loader';

const Login = () => {
    const firebase = useFirebaseApp();
    const [form, setForm] = useState({
        email:'',
        password:''
    });
    const [error, setError] = useState(null);
    const [loader, setLoader] = useState(false);
    
    const sessionUser = useUser();
    if(sessionUser) return window.location.assign('/');
    const handleChange = event=>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        });
    }

    const handleSubmit = event=>{
        event.preventDefault();
        setLoader(true);
        if(form.email.trim() === '' || form.password.trim() === ''){
            return false;
        };
        setError(null);
        firebase.auth().signInWithEmailAndPassword(form.email,form.password).then(res=>{
            window.location.assign('/');
        }).catch(err=>{
            setLoader(false);
            setError(true);
        })
    };

    return (
        <form className="container mt-5" onSubmit={handleSubmit}>
            {(error)?<Error message="Contraseña incorrecta"/>:null}
            {(loader)?<Loader/>:null}
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingrese su email" name="email" onChange={handleChange}/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={handleChange}/>
            </div>
            <input type="submit" className="btn btn-primary" value="Iniciar sesión"/>
        </form>
    );
}
 
export default Login;