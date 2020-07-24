import React,{useState,useEffect} from 'react';
import TablaCategorias from '../../components/tables/Categorias';
import Loader from '../../components/Loader/Loader';
import { API } from "../../config";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
const Categorias = () => {
    const MySwal = withReactContent(Swal)
    const [request, setRequest] = useState({
        loading:true,
        error:false,
        data:undefined
    });

    useEffect(() => {
        getCategorias();
    }, [])

    const getCategorias = async()=>{
        try {
            fetch(`${API}/categorias`).then(res=>res.json()).then(data=>{
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

    const deleteCategoria= id=>{
        MySwal.fire({
            title: '¿Desea eliminar la categoria?',
            text: "Esta acción no se puede deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar!',
          }).then((result) => {
            if (result.value) {
                fetch(`${API}/categorias/${id}`,{method:'DELETE'}).then(res=>res.json()).then(data=>{
                    console.log(data);
                    Swal.fire(
                        'Eliminado!',
                        '',
                        'success'
                    ).then(()=>{
                        getCategorias();
                    })
                }) 
            }
        })
    }

    return (
        (request.loading)?<Loader/>:
        <TablaCategorias
            categorias={request.data}
            deleteCategoria={deleteCategoria}/>
    );
}
 
export default Categorias;