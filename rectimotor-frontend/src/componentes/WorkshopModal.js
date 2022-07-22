import React, { useState } from "react";
import MenuButton from "./MenuButton";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function WorkshopModal() {
    const [workShopName, setworkShopName] = useState('');
    const [OwnerName, setOwnerName] = useState('');
    const [number, setNumber] = useState('');
    
    const URI = "http://localhost:3412/workShops";
    
    const addWorkShop = () => {
        
        console.log(workShopName + ', ' + OwnerName + ', ' + number)
        
        const requestOption = {
            method: "post", 
            body: JSON.stringify({
                NOMBRE_TALLER: workShopName, 
                NOMBRE_PROPIETARIO: OwnerName, 
                TELEFONO_TALLER: number}),
        };
        
        console.log(requestOption.body)
        
        return fetch(URI, requestOption);
    }

    return (
        <div className="container">
            <h2 className="text-center">Registro de nuevo taller</h2>
            <br/>

                <div className="container">

                    <div className="row">

                        <div className="col">
                            <label>Nombre del taller: </label>
                        </div>

                        <div className="col">
                            <input
                             onChange={({ target: { value } }) => setworkShopName(value)}  
                             type="text" placeholder="Taller" />
                        </div>

                    </div>

                    <div className="row">

                        <div className="col">
                            <label>Nombre del propietario: </label>
                        </div>

                        <div className="col">
                            <input
                             onChange={({ target: { value } }) => setOwnerName(value)} 
                             type="text" placeholder="Propietario" />
                        </div>

                    </div>

                    <div className="row">
                        <div className="col">
                            <label>Teléfono</label>
                        </div>

                        <div className="col">
                            <input 
                            onChange={({ target: { value } }) => setNumber(value)}
                            type="text" placeholder="teléfono" />
                        </div>
                    </div>


                    <br/>

                    <Link to='/menu' className="text-decoration-none">
                        <div className="row">
                            <button className="btn btn-success" onClick={addWorkShop}>
                                <h3>Confirmar</h3>
                            </button>
                        </div>
                    </Link>
                    <Link to='/menu' className="text-decoration-none">
                        <div className="row">
                            <button className="btn btn-danger">
                                <h3 className="text-decoration-none">Descartar</h3>
                            </button>
                        </div>
                    </Link>

                </div>

        </div>
    );
}

export default WorkshopModal;