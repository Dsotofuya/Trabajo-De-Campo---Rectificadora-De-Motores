import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavBar from '../componentes/NavBar';
import '../estilos/reporte.css';


function SearchUpdate() {
    // Getting the data from de database and setting the variable to render
    const URI = 'http://localhost:3412/orders/'
    const [orders, setOrders] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(URI + params.id).then((res) => res.json()).then((data) => { setOrders(data) })
    }, [])
    // -------------------------------------------------------------------
    console.log(orders)
    const validateInput = new RegExp('^[0-9]{0,10}$');

    const validation = true;


    // Returning the component 
    return (
        <>
            <div className="App ">
                <NavBar />
                <div>
                    <div className='contenedor-principal'>

                        <h1 className='d-flex justify-content-center'>Busqueda de Orden</h1>
                        <div className='d-flex justify-content-center'>
                            {/* Input de la cedula u orden */}
                            <form onSubmit={() => {
                                navigate(`/orders/get/${document.getElementById('orderID').value}`)
                                const val = document.getElementById('orderID').value
                                if (validateInput.test(val) != true) {
                                    alert('Entrada incorrecta')
                                    validation = false
                                }
                            }}>
                                <input
                                    id="orderID"
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
                                                <th> Taller </th>
                                                <th> nombre motor </th>
                                                <th> fecha de recibido </th>
                                                <th> estado de la orden </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //Se verifica si el array existe antes de renderizar las targetas
                                                (orders[0] || []).map((order, i) => {
                                                    if (validation) {

                                                        return <tr className='orderRow' key={i} onClick={() => navigate(`/orders/details/${order.id_orden}`)}>
                                                            <td>{order.id_orden}</td>
                                                            <td>{order.nombre_taller}</td>
                                                            {/* <td>{order.cc_persona}</td> */}
                                                            <td>{order.nombre_motor}</td>
                                                            <td>{order.fecha_recibido}</td>
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

export default SearchUpdate;