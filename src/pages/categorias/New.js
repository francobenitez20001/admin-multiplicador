import React, { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import FormAddCategoria from '../../components/forms/AddCategoria';
import { API } from "../../config";
import Swal from 'sweetalert2';
import { useUser } from 'reactfire';

const NewCategoria = (props) => {
    const [request, setRequest] = useState({
        loading:false,
        error:false
    });

    const [formValues, setFormValues] = useState({
        categoria:''
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
        setRequest({...request,loading:true});
        if(validar(formValues)){
            fetch(`${API}/categorias`,{
                method:'POST',
                body:new FormData(document.getElementById('formNuevaCategoria'))
            }).then(res=>res.json()).then(response=>{
                setRequest({...request,loading:false});
                Swal.fire(
                    'Listo!',
                    response.message,
                    'success'
                ).then(()=>{
                    props.history.push('/categorias');
                })
            }).catch(err=>{
                setRequest({...request,loading:false});
                Swal.fire(
                    'Ups..',
                    'Problemas al agregar la categoria',
                    'success'
                );
                console.log(err);
            })
        }
    };

    const validar = state=>{
        if(state.categoria.trim() === ''){
            return false;
        }
        return true;
    }

    return (
        (request.loading)?<Loader/>:<FormAddCategoria handleSubmit={handleSubmit}
                                                    handleChange={handleChange}
                                                    form={formValues}/>
    );
}
 
export default NewCategoria;