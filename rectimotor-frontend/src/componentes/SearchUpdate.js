import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../componentes/NavBar';
import '../estilos/reporte.css';


function SearchUpdate() {

    const ordersArray = [];
    const [input, setInput] = useState('')
    const [orders, setOrders] = useState('')
    const params = useParams()
    const navigate = useNavigate()

    const [workShops, setWorkShops] = useState('');
    const [vehicles, setVehicles] = useState('');
    const [AllOrders, setAllORders] = useState('');

    const workShopsURI = 'https://rectimotor-server.herokuapp.com/workshops/';
    const vehiclesURI = 'https://rectimotor-server.herokuapp.com/engines/';
    const ordesURI = 'https://rectimotor-server.herokuapp.com/orders/';

    fetch(ordesURI).then((res) => res.json()).then((data) => { setAllORders(data) })

    useEffect( () => {
        //fetch(ordesURI + params.id).then((res) => res.json()).then((data) => { setOrders(data) })
        fetch(workShopsURI).then((res) => res.json()).then((data) => {setWorkShops(data)})
        fetch(vehiclesURI).then((res) => res.json()).then((data) => {setVehicles(data)})
        fetch(ordesURI).then((res) => res.json()).then((data) => {setAllORders(data)})
    }, [])

    function compareWorkShop(){
        let workShopID = '';
        for(let i = 0; i < workShops.length; i++){
            if(input == workShops[i].NOMBRE_TALLER){
                workShopID = workShops[i].ID_TALLER;
                break;
            }
        }
        return workShopID;
    }

    function compareVehicle(){
        let vehicleID = '';
        for(let i = 0; i < vehicles.length; i++){
            if(input == vehicles[i].NOMBRE_MOTOR){
                vehicleID = vehicles[i].ID_MOTOR;
                break;
            }
        }
        return vehicleID;
    }

    function formatDate(fecha){
        let fechaFormat = '';

        if(fecha!=null){
            let a = new Date(String(fecha).substring(0,10))
            fechaFormat = a.getDay() +'/'+ a.getMonth() +'/'+a.getFullYear();
        }
        
        return fechaFormat
    }

    function vehicleName(id){
        let vehicleName = '';
        for(let i = 0; i < vehicles.length; i++){
            if(id == vehicles[i].ID_MOTOR){
                vehicleName = vehicles[i].NOMBRE_MOTOR;
                break;
            }
        }
        return vehicleName;
    }

    return(
        <div className="App">
        <NavBar />
            <div>
                <div className='contenedor-principal'>

                    <h1 className='d-flex justify-content-center'>Actualizar orden</h1>
                    <div className='d-flex justify-content-center'>
                        {/* Input de la Nombre de taller, nombre de vehículo/motor o número de orden */}
                
                        <div>
                            <input onChange={({ target: { value } }) => {setInput(value)}}
                            type="text" placeholder="Nombre de usuario"></input>

                            <button className='buton' onClick={() => {
                            
                            
                              (AllOrders || []).map(
                                (order, i) =>{
                                    if(compareWorkShop() == order.ID_TALLER ||compareVehicle() == order.ID_MOTOR || input == order.ID_ORDEN){
                                        ordersArray.push(order)
                                    }
                                }
                            )
                            setOrders(ordersArray)
                            
                            }}>Buscar</button>
                        </div>
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
                                            (orders|| []).map((order, i) => {
                                                return <tr className='orderRow' key={i} onClick={() => navigate(`/orders/get/${order.ID_ORDEN}`)}>
                                                <td>{order.ID_ORDEN}</td>
                                                <td>{order.CC_PERSONA}</td>
                                                <td>{vehicleName(order.ID_MOTOR)}</td>
                                                <td>{formatDate(order.FECHA_RECIBIDO)}</td>
                                                <td>{order.ESTADO_ORDEM}</td>
                                                </tr>
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
    );
}

export default SearchUpdate;