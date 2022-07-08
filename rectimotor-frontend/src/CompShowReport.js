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
                    {
                        (details[0] || []).map((detail, i) => {
                            if(i==0){
                                return <div className='detalles'>
                                            <p>Reporte número: {detail.ID_REPORTE}</p>
                                            <p> Nombre del propietario: {detail.NOMBRES_APELLIDOS}</p>                
                                            <p>Cédula: {detail.CC_PERSONA}</p>
                                            <p>Número de teléfono: {detail.TELEFONO_PERSONA}</p>
                                        </div>
                                    }
                            })
                
                    }
                    <div className='row'>
                        <div className='col'>
                            <table className='table'>
                                <thead className='table-primary'>
                                    <tr>
                                        <th>Nombre del trabajo: </th>  
                                        <th>Valor del trabajo: </th>                
                                    </tr>
                                </thead>
                                <tbody>
                                { 
                                    (details[0] || []).map((detail, i) => {
                                    return <tr className='fila-reporte' key={i}>
                                        <td>{detail.NOMBRE_TRABAJO}</td>
                                        <td>{detail.VALOR_TRABAJO}</td>                                    
                                        </tr>
                                    })

                                    
                                }

                                {(details[0] || []).map((detail, i) => {
                                        if(i==0){
                                            return <tr className='fila-reporte' key={i}>
                                            <td>Total: </td>  
                                            <td>{detail.TOTAL}</td> 
                                            </tr>
                                        }
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