import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from './componentes/NavBar';
import './estilos/reporte.css';
import sweetAlert from 'sweetalert';


const CompShowOrdersLogged = () => {
    // Getting the data from de database and setting the variable to render
    const URI = 'https://rectimotor-server.herokuapp.com/orders/'
    const [orders, setOrders] = useState([])
    const params = useParams()
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('Logged user'));
    let userName =localStorage.getItem('User name');
    console.log(user)

    useEffect(() => {   
        fetch(URI + params.id).then((res) => res.json()).then((data) => { setOrders(data) })
        if(user == null){
            sweetAlert('No se ha iniciado sesión, redirigiendo a Log in...')
            navigate('/')
        }
    
        if(user!= null){
            // sweetAlert('Bienvenido ' + user[0].TIPO_USUARIO + " " + userName)
        
        }
    }, [])


    // -------------------------------------------------------------------

    const validateInput = new RegExp('^[0-9]{0,10}$');
    const validation = true;

    function formatDate(fecha){
        console.log(fecha)
        let fechaFormat = '';

        if(fecha!=null){
            let a = new Date(String(fecha).substring(0,10))
            fechaFormat = a.getDay() +'/'+ a.getMonth() +'/'+a.getFullYear();
        }
        
        return fechaFormat
    }

    // Returning the component 
    return (       
       <>
       
        <div className="App ">
        
            <NavBar/>

            <div className='menu'>
                <div className='usuario'>
                    <h3>{user[0].TIPO_USUARIO}: {userName}</h3>
                    <button className='rounded cerrar-sesion' onClick={()=>{
                    localStorage.clear()
                    navigate('/')
                    }}>Cerrar sesión</button>
                </div>
            </div>
            <div>
                <div className='contenedor-principal'>

                    <h1 className='d-flex justify-content-center'>Consulte el estado de su motor</h1>
                    <div className='d-flex justify-content-center'>
                        {/* Input de la cedula u orden */}
                        <form onSubmit={() => {
                            navigate(`/logged/orders/${document.getElementById('cc').value}`)
                            const val = document.getElementById('cc').value;
                            if (validateInput.test(val) != true) {
                                alert('Entrada incorrecta')
                                validation = false
                            }
                        }}>
                            <input
                                id="cc"
                                className='input'
                                type='text'
                                name='search'
                                autoComplete='off'
                            ></input>
                            <button className='buton' variant='primary' type='submit'>Buscar</button>
                        </form>
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <table className='table'>
                                    <thead className='table-primary'>
                                        <tr>
                                            <th> id de la orden </th>
                                            <th> Cédula </th>
                                            <th> nombre motor </th>
                                            <th> fecha de recibido </th>
                                            <th> estado de la orden </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            //Se verifica si el array existe antes de renderizar las targetas
                                            (orders[0] || []).map((order, i) => {
                                                if(validation){
                                                
                                                return <tr className='orderRow' key={i} onClick={() => navigate(`/logged/orders/details/${order.id_orden}`)}>
                                                <td>{order.id_orden}</td>
                                                <td>{order.cc_persona}</td>
                                                <td>{order.nombre_motor}</td>
                                                <td>{formatDate(order.fecha_recibido)}</td>
                                                <td>{order.estado_orden}</td>
                                                </tr>
                                            }
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </>
    )
}

export default CompShowOrdersLogged;