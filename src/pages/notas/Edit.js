import React, { useState,useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import FormEditNota from '../../components/forms/EditNota';
import { API } from "../../config";
import Swal from 'sweetalert2';
import { useUser } from 'reactfire';

const EditNota = (props) => {
    const [request, setRequest] = useState({
        loading:true,
        error:false,
        data:undefined
    });
    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formValues, setFormValues] = useState(undefined);

    useEffect(() => {
        getDatos();
    }, []);
    const user = useUser();
    if(!user) return window.location.assign('/');

    const getDatos = async()=>{
        await getNota();    
        await getAutores();
        await getCategorias();
    }

    const getNota = async()=>{
        try {
            fetch(`${API}/notas/${props.match.params.id}`).then(res=>res.json()).then(data=>{
                setRequest({
                    ...request,
                    data:data.data[0]
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

    const getAutores = async()=>{
        try {
            fetch(`${API}/autores`).then(res=>res.json()).then(data=>{
                setAutores(data.data);
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
        }
    };

    const getCategorias = async()=>{
        try {
            fetch(`${API}/categorias`).then(res=>res.json()).then(data=>{
                setCategorias(data.data);
                setRequest({...request,loading:false});
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
        }
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
            fetch(`${API}/notas/${props.match.params.id}`,{
                method:'PUT',
                body:new FormData(document.getElementById('formEditarNota'))
            }).then(res=>res.json()).then(response=>{
                setRequest({...request,loading:false});
                Swal.fire(
                    'Listo!',
                    response.message,
                    'success'
                ).then(()=>{
                    props.history.push('/notas');
                })
            }).catch(err=>{
                setRequest({...request,loading:false});
                Swal.fire(
                    'Ups..',
                    'Problemas al modificar la nota',
                    'success'
                );
                console.error(err);
            })
        }
    };

    const validar = state=>{
        if(state.idAutor === '' || state.idCategoria === '' || state.titulo === '' || state.resumen === '' ||
        state.contenido === '' || state.fecha === ''){
            return false;
        }
        return true;
    }

    return (
        (request.loading)?<Loader/>:<FormEditNota   handleSubmit={handleSubmit}
                                                    handleChange={handleChange}
                                                    nota={formValues}
                                                    autores={autores}
                                                    categorias={categorias}/>
    );
}
 
export default EditNota;