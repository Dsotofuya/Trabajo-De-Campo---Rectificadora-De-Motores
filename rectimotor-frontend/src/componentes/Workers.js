import React, { useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import sweetAlert from 'sweetalert';
function Workers(){

    const URI = 'http://localhost:3412/users/';
    const [users, setUsers] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        console.log('xd')
        
    }, [])
    fetch(URI).then((res) => res.json()).then((data) => { setUsers(data) })
    const deleteUser = (nombre) => {
        sweetAlert({
            text: "¿Eliminar trabajador?",
            buttons: ["No", "Si"]}).then( (res) => {
                if(res){
                    const request = {
                        method: 'DELETE',
                      }
                    return fetch(URI + nombre, request)
                }
            });
    }

    return(
        <div>
            <h1>Mostras trabajadores</h1>
            <table className='table'>
                                    <thead className='table-primary'>
                                        <tr>
                                            <th> Nombre del trabajador </th>
                                            <th>Eliminar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            //Se verifica si el array existe antes de renderizar las targetas
                                            (users || []).map((user, i) => {
                                               if(user.TIPO_USUARIO == 'Trabajador'){
                                                return <tr className='orderRow' key={i}>
                                                <td>{user.NOMBRE_USUARIO}</td>
                                                <td><button className="elminar" onClick={() => {
                                                    deleteUser(user.NOMBRE_USUARIO)
                                                }}>Eliminar</button></td>
                                                </tr>
                                               }
                                    
                                            })
                                        }
                                    </tbody>
                                </table>
                                <button className='boton-regresar' onClick={() => navigate('/logged/buscar')}>Regresar</button> 
        </div>
    );
}

export default Workers;