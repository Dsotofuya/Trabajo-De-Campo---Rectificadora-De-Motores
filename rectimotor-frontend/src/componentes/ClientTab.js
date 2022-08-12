import React from "react";
import './App.css';

const ClientTab = ({ nameMotor, nameWorkshop, ownerName, ownerId, engineStatus }) => {
    return (
        <div>
            <div className="resultados-busqueda">
                <div className="row">

                    <div className="col-sm">
                        <p>Nombre del motor: &nbsp; {nameMotor} &nbsp;</p>
                    </div>
                    <div className="col-sm">
                        <p>Nombre del taller: &nbsp; {nameWorkshop} &nbsp;</p>
                    </div>
                    <div className="col-sm">
                        <p>Nombre del propietario: &nbsp; {ownerName} &nbsp;</p>
                    </div>
                    <div className="col-sm">
                        <p>Cédula del propietario: &nbsp; {ownerId} &nbsp;</p>
                    </div>
                </div>
            </div>
            <p>{engineStatus}</p>
        </div>
    );
}
export default ClientTab;