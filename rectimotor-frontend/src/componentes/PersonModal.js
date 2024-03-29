import React, { Component, useState } from "react";
import Portal from "./Portal";
import MenuButton from "./MenuButton";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';


function PersonModal(props) {

    
    const [personName, setPersonName] = useState('');
    const [personDoc, setPersonDoc] = useState('');
    const [phoneNumber, setPhone] = useState('');

    const URI = "https://rectimotor-server.herokuapp.com/persons"; 

    const num=(value)=>{
        setPersonDoc(value)
    }



    const addPerson = () => {
        console.log(personName + ', ' + personDoc + ', ' + phoneNumber)

        const requestOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                NOMBRES_APELLIDOS: personName,
                CC_PERSONA: personDoc,
                TELEFONO_PERSONA: phoneNumber
            }),
        };

        console.log(requestOption.body)
        props.toggle()
        props.name(personName)
        props.document(personDoc)
        props.phone(phoneNumber)
        return fetch(URI, requestOption);
    }
    
    return (
        <div className="container">
            <h2 className="text-center">Registro de Cliente</h2>
            <br />

            <div className="container">

                <div className="row">

                    <div className="col">
                        <label>Nombre de la persona: </label>
                    </div>

                    <div className="col">
                        <input
                            onChange={({ target: { value } }) => setPersonName(value)}
                            type="text" placeholder="Nombre" />
                    </div>

                </div>

                <div className="row">

                    <div className="col">
                        <label>Cedula de la persona: </label>
                    </div>

                    <div className="col">
                        <input
                            onChange={({ target: { value } }) => num(value)}
                            type="text" placeholder="Cedula" />
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <label>Teléfono</label>
                    </div>

                    <div className="col">
                        <input
                            onChange={({ target: { value } }) => setPhone(value)}
                            type="tel" placeholder="teléfono" />
                    </div>
                </div>


                <br />

                {/* <Link to='/menu' className="text-decoration-none"> */}
                <div className="row">
                    <button className="btn btn-success" onClick={addPerson}>
                        <h3>Confirmar</h3>
                    </button>
                </div>
                <br/>
                {/* </Link> */}
                {/* <Link to='/menu' className="text-decoration-none"> */}
                <div className="row">
                    <button className="btn btn-danger" onClick={props.toggle}>
                        <h3 className="text-decoration-none">Descartar</h3>
                    </button>
                </div>
                {/* </Link> */}

            </div>

        </div>
    );
}

export default PersonModal;