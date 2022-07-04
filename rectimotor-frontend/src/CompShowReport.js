import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const CompShowReports = () => {
    // Getting the data from de database and setting the variable to render
    const URI = 'http://localhost:3412/orders/details/'
    const [details, setDetails] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(URI + params.id_order).then((res) => res.json()).then((data) => { setDetails(data) })
    }, [])
    // -------------------------------------------------------------------
    console.log(details)
    // Returning the component 
    return (
        <div className="App">
            <div className='contenedor-principal'>
                <h1>Consulte el estado de su motor</h1>
                {/* Input de la cedula u orden */}
                <form onSubmit={() => navigate(`/orders/${document.getElementById('cc').value}`)}>
                    <input id="cc" className='input' type='text' name='search'></input>
                    <button className='buton' variant='primary' type='submit'>Buscar</button>
                </form>
                <div className='container'>
                    {/* 
                    <div> {details[0]..id_reporte} </div>
                    <div> {details[0].cc_persona} </div>
                    <div> {details[0].nombres_apellidos}</div>
                    <div> {details[0].nombre_trabajo}</div>
                    <div> {details[0].telefono_persona}</div>
                    <div> {details[0].total}</div>
                    <div> {details[0].valor_trabajo}</div> 
                    */}
                </div>
            </div>
        </div>
    )
}

//<!-- Se verifica si el array existe antes de renderizar las targetas
//</div>(details[0] || []).map((detail, i) => { -->
export default CompShowReports;