import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './estilos/reporte.css';


const CompShowReports = () => {
    // Getting the data from de database and setting the variable to render
    const URI = 'http://localhost:3412/orders/details/'
    const [details, setDetails] = useState([])
    var total = 0
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        fetch(URI + params.id_order).then((res) => res.json()).then((data) => { setDetails(data) })
    }, [])

    const URIParts = "http://localhost:3412/detOrd/parts/";
    const [parts, setParts] = useState([])
    useEffect(() => {
        fetch(URIParts + params.id_order).then((res) => res.json()).then((data) => { setParts(data) })
    }, [])

    const URIWorks = "http://localhost:3412/detOrd/works/";
    const [works, setWorks] = useState([])
    useEffect(() => {
        fetch(URIWorks + params.id_order).then((res) => res.json()).then((data) => { setWorks(data) })
    }, [])

    const URIReplacements = "http://localhost:3412/detOrd/replacements/";
    const [replacements, setReplacements] = useState([])
    useEffect(() => {
        fetch(URIReplacements + params.id_order).then((res) => res.json()).then((data) => { setReplacements(data) })
    }, [])
    // -------------------------------------------------------------------
    console.log('Detalles')
    console.log(details)
    console.log('Partes')
    console.log(parts)
    console.log('Trabajos')
    console.log(works)
    console.log('Repuestos')
    console.log(replacements)
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
                                            <p>Reporte número: {detail.ID_ORDEN}</p>
                                            <p> Nombre del propietario: {detail.NOMBRES_APELLIDOS}</p>                
                                            <p>Cédula: {detail.CC_PERSONA}</p>
                                            <p>Número de teléfono: {detail.TELEFONO_PERSONA}</p>
                                        </div>
                                    }
                            })
                
                    }
                           
                            <h1>Trabajos</h1>
                            <table className='table'>
                                <thead className='table-head'>
                                    <tr>
                                        <th>Nombre del trabajo: </th>  
                                        <th>Valor del trabajo: </th>                
                                    </tr>
                                </thead>
                                <tbody>
                                { 
                                    works.map((work, i) => {
                                        total += parseInt(work.VALOR_TRABAJO)
                                    return <tr className='fila-reporte' key={i}>
                                        <td>{work.NOMBRE_TRABAJO}</td>
                                        <td>{work.VALOR_TRABAJO}</td>                                    
                                        </tr>
                                    })

                                    
                                }

                                {works.map((work, i) => {
                                        if(i==0){
                                            return <tr className='fila-reporte' key={i}>
                                            <td>Total: </td>  
                                            <td>{total}</td> 
                                            </tr>
                                        }
                                        })}
                                </tbody>
                            </table>
                    
                    <h1>Partes</h1>
                            <table className='table'>
                                <thead className='table-head'>
                                    <tr>
                                        <th>Nombre parte </th>
                                        <th>Cantidad parte </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parts.map(
                                        (part, i) => {
                                            return <tr className='fila-reporte' key={i}>
                                            <td>{part.NOMBRE_PARTE}</td>
                                            <td>{part.CANTIDAD}</td>
                                            </tr>
                                        }
                                    )}
                                </tbody>
                            </table>
                            <h1>Repuestos</h1>
                            <table className='table'>
                                <thead className='table-head'>
                                    <tr>
                                        <th>Nombre repuesto </th>
                                        <th>Cantidad repuesto </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {replacements.map(
                                        (replacement, i) => {
                                            return <tr className='fila-reporte' key={i}>
                                            <td>{replacement.NOMBRE_REPUESTO}</td>
                                            <td>{replacement.CANTIDAD}</td>
                                            </tr>
                                        }
                                    )}
                                </tbody>
                            </table>
                
                    <button className='boton-regresar' onClick={() => navigate('/orders/id')}>Regresar</button> 
                </div>
            </div>
        </div>
    )
}
//<!-- Se verifica si el array existe antes de renderizar las targetas
//</div>(details[0] || []).map((detail, i) => { -->
export default CompShowReports;