import React, { useState,useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import FormEditCategoria from '../../components/forms/EditCategoria';
import { API } from "../../config";
import Swal from 'sweetalert2';

const EditCategoria = (props) => {
    const [request, setRequest] = useState({
        loading:true,
        error:false,
        data:undefined
    });

    const [formValues, setFormValues] = useState(undefined);

    useEffect(() => {
        getCategoria();
    }, [])

    const getCategoria = async()=>{
        try {
            fetch(`${API}/categorias/${props.match.params.id}`).then(res=>res.json()).then(data=>{
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
            fetch(`${API}/categorias/${props.match.params.id}`,{
                method:'PUT',
                body:new FormData(document.getElementById('formEditarCategoria'))
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
                    'Problemas al modificar la categoria',
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
        (request.loading)?<Loader/>:<FormEditCategoria handleSubmit={handleSubmit}
                                                    handleChange={handleChange}
                                                    categoria={formValues}/>
    );
}
 
export default EditCategoria;