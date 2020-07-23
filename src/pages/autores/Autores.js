import React, { useState,useEffect } from 'react';
import TablaAutores from '../../components/tables/Autores';
import Loader from '../../components/Loader/Loader';
import { API } from "../../config";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Autores = () => {
    const MySwal = withReactContent(Swal)
    const [request, setRequest] = useState({
        loading:true,
        error:false,
        data:undefined
    });

    useEffect(() => {
        getAutores();
    }, [])

    const getAutores = async()=>{
        try {
            fetch(`${API}/autores`).then(res=>res.json()).then(data=>{
                setRequest({
                    data:data.data,
                    loading:false
                });
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
    }

    const deleteAutor = id=>{
        MySwal.fire({
            title: '¿Desea eliminar el autor?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                fetch(`${API}/autores/${id}`,{method:'DELETE'}).then(res=>res.json()).then(data=>{
                    console.log(data);
                    Swal.fire(
                        'Eliminado!',
                        '',
                        'success'
                    ).then(()=>{
                        getAutores();
                    })
                }) 
            }
        })
    }

    return (
        (request.loading)?<Loader/>:
        <TablaAutores
            autores={request.data}
            deleteAutor={deleteAutor}/>
    );
}
 
export default Autores;