import React, { useState,useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import FormEditNota from '../../components/forms/EditNota';
import { API } from "../../config";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useUser } from 'reactfire';

const MySwal = withReactContent(Swal)
const EditNota = (props) => {
    const [request, setRequest] = useState({
        loading:true,
        error:false,
        data:undefined
    });
    const [resources, setResources] = useState([]);
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
                    data:data.data[0],
                });
                setResources(data.resource);
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

    const modificarImagen = id =>{
        Swal.fire({
            title: 'Editar Imagen',
            html:
              `
                <form id="editarImagen">
                    <input id="swal-input2" required className="swal2-input" type="file" name="archivo"/>
                    <input type="hidden" name="idArchivo" value="${id}"/>
                </form>
              `,
            focusConfirm: true,
            preConfirm: () => {
                setRequest({...request,loading:true});
                let data = new FormData(document.getElementById('editarImagen'));
                fetch(`${API}/archivos/${id}`,{
                    method:'PUT',
                    body:data
                }).then(res=>res.json()).then(response=>{
                    setRequest({...request,loading:false});
                    if(response.info && response.info == 'File not foud'){
                        return Swal.fire(
                            'Ups!',
                            response.info,
                            'error'
                        )
                    }
                    Swal.fire(
                        'Listo!',
                        response.message,
                        'success'
                    ).then(()=>{
                        getDatos();
                    });
                }).catch(console.error)
            }
        })
    }

    const eliminarImagen = (id,nombre)=>{
        MySwal.fire({
            title: '¿Desea eliminar el archivo?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                setRequest({...request,loading:true});
                let nombreImagen = nombre.split('/')[4];
                fetch(`${API}/archivos/${id}?name=${nombreImagen}`,{
                    method:'DELETE'
                }).then(res=>res.json()).then(response=>{
                    setRequest({...request,loading:false});
                    console.log(response);
                    Swal.fire(
                        'Eliminado',
                        response.message,
                        'warning'
                    ).then(()=>{
                        getDatos();
                    });
                })
            }
        })
    }

    const cargarMasImagenes = ()=>{
        Swal.fire({
            title: 'Agregar Imagenes',
            html:
              `
                <form id="form-imagenes-add">
                    <input id="swal-input2" className="swal2-input" type="file" multiple name="files"/>
                    <input type="hidden" name="idNota" value="${props.match.params.id}"/> 
                </form>
              `,
            focusConfirm: false,
            preConfirm: () => {
                setRequest({...request,loading:true});
                let files = new FormData(document.getElementById('form-imagenes-add'));
                fetch(`${API}/archivos`,{
                    method:'POST',
                    body:files
                }).then(res=>res.json()).then(response=>{
                    setRequest({...request,loading:false});
                    Swal.fire(
                        'Listo!',
                        response.info,
                        'success'
                    ).then(()=>{
                        getDatos();
                    });
                })
            }
        })
    }

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
                                                    resources={request.resources}
                                                    autores={autores}
                                                    categorias={categorias}
                                                    resources={resources}
                                                    modificarImagen={modificarImagen}
                                                    eliminarImagen={eliminarImagen}
                                                    cargarMasImagenes={cargarMasImagenes}/>
    );
}
 
export default EditNota;