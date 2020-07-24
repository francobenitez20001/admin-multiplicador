import React, { useState,useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import FormEditAutor from '../../components/forms/EditAutor';
import { API } from "../../config";
import Swal from 'sweetalert2';
import { useUser } from 'reactfire';

const EditAutor = (props) => {
    const [request, setRequest] = useState({
        loading:true,
        error:false,
        data:undefined
    });

    const [formValues, setFormValues] = useState(undefined);

    useEffect(() => {
        getAutor();
    }, []);

    const user = useUser();
    if(!user) return window.location.assign('/');

    const getAutor = async()=>{
        try {
            fetch(`${API}/autores/${props.match.params.id}`).then(res=>res.json()).then(data=>{
                setRequest({
                    ...request,
                    data:data.data[0],
                    loading:false
                });
                setFormValues(data.data[0]);
            }).catch(err=>{
                setRequest({
                    error:err
                })
            });
        } catch (error) {
            console.log(error);
            setRequest({
                error:error
            })
        };
    };

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
            fetch(`${API}/autores/${props.match.params.id}`,{
                method:'PUT',
                body:new FormData(document.getElementById('formEditarAutor'))
            }).then(res=>res.json()).then(response=>{
                setRequest({...request,loading:false});
                Swal.fire(
                    'Listo!',
                    response.message,
                    'success'
                ).then(()=>{
                    props.history.push('/autores');
                })
            }).catch(err=>{
                setRequest({...request,loading:false});
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
        (request.loading)?<Loader/>:<FormEditAutor handleSubmit={handleSubmit}
                                                    handleChange={handleChange}
                                                    autor={formValues}/>
    );
}
 
export default EditAutor;