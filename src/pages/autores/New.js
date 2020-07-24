import React, { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import FormAddAutor from '../../components/forms/AddAutor';
import { API } from "../../config";
import Swal from 'sweetalert2';
import { useUser } from 'reactfire';

const NewAutor = (props) => {
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        nombre:'',
        apellido:'',
        descripcion:'',
        twitter:''
    });
    const user = useUser();
    if(!user) return window.location.assign('/');

    const handleChange = event=>{
        setFormValues({
            ...formValues,
            [event.target.name]:event.target.value
        });
    }

    const handleSubmit = event=>{
        event.preventDefault();
        setLoading(true);
        if(validar(formValues)){
            fetch(`${API}/autores`,{
                method:'POST',
                body:new FormData(document.getElementById('formAgregarAutor'))
            }).then(res=>res.json()).then(response=>{
                setLoading(false);
                console.log(response);
                Swal.fire(
                    'Listo!',
                    response.message,
                    'success'
                ).then(()=>{
                    props.history.push('/autores');
                })
            }).catch(err=>{
                setLoading(false);
                Swal.fire(
                    'Ups..',
                    'Problemas al modificar el autor',
                    'success'
                );
                console.log(err);
            })
        }
    };

    const validar = state=>{
        if(state.nombre.trim() === '' || state.apellido.trim() === '' || state.descripcion.trim() === '' || state.twitter.trim() === ''){
            return false;
        }
        return true;
    }

    return (
        (loading)?<Loader/>:<FormAddAutor handleSubmit={handleSubmit}
                                                    handleChange={handleChange}
                                                    form={formValues}/>
    );
}
 
export default NewAutor;