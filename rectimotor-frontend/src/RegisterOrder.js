import React, { useState } from "react";
import './ROrder.css';
import PartFE from "./PartFE";

const RegisterOrder = () => {
  const [name, setName] = useState("");
  const handleInputChange = () => setName
  return (
    <div>
      <h1 className="text-center">   Registro de orden de Ingreso  </h1>
      <div className="container-xl w-100 p-3" >

        <form className="CampDiv">

          <div className="row">
            <div className="col">
                <label>Taller:</label>
            </div>
            <div className="col">
                <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Nombre del Taller"/>
            </div>


            <div className="col">
            <label>Vehiculo:</label>
            </div>
            <div className="col">
                <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Nombre del vehiculo"/>
            </div>
          </div>


          <div className="row">
          <div className="col">
                <label>Responsable:</label>
                </div>
            <div className="col">
                <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Nombre del Responsable"/>
            </div>


            <div className="col">
                <label>Ingreso:</label>
            </div>
            <div className="col">
                <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Fecha de ingreso"/>
            </div>
          </div>


          <div className="row">
          <div className="col">
                <label>Cedula:</label>
                </div>
            <div className="col">
                <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Cedula del responsable"/>
            </div>


            <div className="col">
                <label>Telefono: 
                </label>
            </div>
            <div className="col">
                <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Telefono del responsable"/>
            </div>

          </div>
          <p>
            <hr/>
            <hr/>
          </p>

          <h1 className="text-center">Partes</h1>

          <div>

          <div  className="row">
          <div className="col"> <h5 className="font-weight-bold">Partes Recibidas </h5> </div>
          <div className="col"> <h5 className="font-weight-bold">cantidad </h5> </div>
          <div className="col"> <h5 className="font-weight-bold">Medidas Iniciales </h5> </div>
          <div className="col"> <h5 className="font-weight-bold">Medidas Finales </h5> </div>
          </div>

          <div className="row"> 
          <PartFE namePart= "Bloque"/> 
          </div>

          <div className="row"> 
          <PartFE namePart= "Cigüeñal"/> 
          </div>

          <div className="row"> 
          <PartFE namePart= "Culata"/> 
          </div>
          
          <div className="row"> 
          <PartFE namePart= "Pistones Usados"/> 
          </div>
          
          <div className="row"> 
          <PartFE namePart= "Bielas"/> 
          </div>
          
          <div className="row"> 
          <PartFE namePart= "Valvulas"/> 
          </div>
          
          <div className="row"> 
          <PartFE namePart= "Tapas de Bancada"/> 
          </div>
          
          <div className="row"> 
          <PartFE namePart= "Eje de Levas"/> 
          </div>
          
          <div className="row"> 
          <PartFE namePart= "Carter"/> 
          </div>
          
          <div className="row"> 
          <PartFE namePart= "Tapon de Resortes"/> 
          </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterOrder;