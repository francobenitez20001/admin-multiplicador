import React, { useState,useEffect } from 'react';
import TablaNotas from '../../components/tables/Notas';
import Loader from '../../components/Loader/Loader';
import { API } from "../../config";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const Notas = () => {
    const MySwal = withReactContent(Swal)
    const [request, setRequest] = useState({
        loading:true,
        error:false,
        data:undefined
    });

    useEffect(() => {
        getNotas();
    }, [])

    const getNotas = async()=>{
        try {
            fetch(`${API}/notas?limit=10`).then(res=>res.json()).then(data=>{
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

    const deleteNota = id=>{
        MySwal.fire({
            title: '¿Desea eliminar la nota?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                fetch(`${API}/notas/${id}`,{method:'DELETE'}).then(res=>res.json()).then(data=>{
                    console.log(data);
                    Swal.fire(
                        'Eliminado!',
                        '',
                        'success'
                    ).then(()=>{
                        getNotas();
                    })
                }) 
            }
        })
    }

    return (
        (request.loading)?<Loader/>:<TablaNotas deleteNota={deleteNota}
                                                notas={request.data}
                                                />
    );
}
 
export default Notas;