import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './estilos/reporte.css';


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
            <div className='reporte'>
                    <h1>Reporte del motor</h1>
                    <div className='row'>
                        <div className='col'>
                            <table className='table'>
                                <thead className='table-primary'>
                                    <tr>
                                        <th>Cédula: </th>
                                        <th>Identificación de reporte: </th>
                                        <th>Nombres y apelldos: </th>
                                        <th>Nombre del trabajo: </th>
                                        <th>Número de teléfono: </th>
                                        <th>Total: </th>     
                                        <th>Valor del trabajo: </th>                 
                                    </tr>
                                </thead>
                                <tbody>
                                { 
                                    (details[0] || []).map((detail, i) => {
                                    return <tr className='fila-reporte' key={i}>
                                        <td>{detail.CC_PERSONA}</td>
                                        <td>{detail.ID_REPORTE}</td>
                                        <td>{detail.NOMBRES_APELLIDOS}</td>
                                        
                                        <td>{detail.TELEFONO_PERSONA}</td>
                                        <td>{detail.TOTAL}</td>
                                        
                                        <td>{detail.NOMBRE_TRABAJO}</td>
                                        <td>{detail.VALOR_TRABAJO}</td>                                         
                                    </tr>
                                     
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button className='boton-regresar' onClick={() => navigate('/orders/id')}>Regresar</button> 
                </div>
            </div>
        </div>
    )
}
//<!-- Se verifica si el array existe antes de renderizar las targetas
//</div>(details[0] || []).map((detail, i) => { -->
export default CompShowReports;