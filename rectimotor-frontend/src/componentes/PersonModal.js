import React, { Component } from "react";
import Portal from "./Portal";
import MenuButton from "./MenuButton";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function PersonModal() {

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
                        <input type="text" placeholder="Nombre" />
                    </div>

                </div>

                <div className="row">

                    <div className="col">
                        <label>Cedula de la persona: </label>
                    </div>

                    <div className="col">
                        <input type="text" placeholder="Cedula" />
                    </div>

                </div>

                <div className="row">
                    <div className="col">
                        <label>Teléfono</label>
                    </div>

                    <div className="col">
                        <input type="tel" placeholder="teléfono" />
                    </div>
                </div>


                <br />

                <Link to='/menu' className="text-decoration-none">
                    <div className="row">
                        <button className="btn btn-success">
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

export default PersonModal;