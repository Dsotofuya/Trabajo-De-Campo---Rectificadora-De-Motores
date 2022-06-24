import React from "react";
import './App.css';

const ClientTab = ({ nameMotor, nameWorkshop, ownerName, ownerId, engineStatus }) => {
    return (
        <div>
            <div className="resultados-busqueda">
                        <p>Nombre del motor: &nbsp; {nameMotor} &nbsp;</p>
                        <p>Nombre del taller: &nbsp; {nameWorkshop} &nbsp;</p>
                        <p>Nombre del propietario: &nbsp; {ownerName} &nbsp;</p>
                        <p>Cédula del propietario: &nbsp; {ownerId} &nbsp;</p>
            </div>
            <p>{engineStatus}</p>
        </div>
    );
}
export default ClientTab;