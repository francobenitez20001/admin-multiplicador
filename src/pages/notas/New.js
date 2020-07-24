import React, { useState,useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import FormAddNota from '../../components/forms/AddNota';
import { API } from "../../config";
import Swal from 'sweetalert2';

const NewNota = (props) => {
    const [request, setRequest] = useState({
        loading:true,
        error:false
    });
    const [autores, setAutores] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formValues, setFormValues] = useState({
        idAutor:'',
        idCategoria:'',
        titulo:'',
        resumen:'',
        contenido:'',
        estado:'1',
        fecha:''
    });

    useEffect(() => {
        getDatos();
    }, [])

    const getDatos = async()=>{ 
        await getAutores();
        await getCategorias();
    }

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
            fetch(`${API}/notas`,{
                method:'POST',
                body:new FormData(document.getElementById('formAgregarNota'))
            }).then(res=>res.json()).then(response=>{
                setRequest({...request,loading:false});
                console.log(response);
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
        (request.loading)?<Loader/>:<FormAddNota   handleSubmit={handleSubmit}
                                                    handleChange={handleChange}
                                                    form={formValues}
                                                    autores={autores}
                                                    categorias={categorias}/>
    );
}
 
export default NewNota;