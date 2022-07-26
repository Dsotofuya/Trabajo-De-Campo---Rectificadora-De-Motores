import React, { useEffect, useState } from "react";
import './ROrder.css';
import PartFE from "./PartFE";
import JobFE from "./JobFE";
import { Link } from 'react-router-dom';
import WorkshopModal from "./componentes/WorkshopModal";
import PersonModal from "./componentes/PersonModal";
import Modal from "./componentes/Modal";

function RegisterOrder() {
  const [activePersonModal, setActivePerson] = useState(false);
  const [activeWorkshopModal, setActiveWorkshop] = useState(false);
  const URI = "http://localhost:3412/orders/";
  const URI2 = "http://localhost:3412/engines/name/";

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  const [workshopName, setWorkshop] = useState("");
  // const [vehicle, setVehicle] = useState(false);
  const [parts, setParts] = useState([]);
  const [works, setWorks] = useState([]);
  const [engineName, setEngineName] = useState([]);
  const [engineId, setEngineId] = useState([]);

  function defineArray(namePart, quant, initialM, finalM, isChecked) {
    // console.log(namePart)
    const parte = { name: namePart, quantity: quant, initialMed: initialM, finalMed: finalM, isChecked: isChecked }
    setParts((partes) => [...partes, parte])
  }

  function defineVoidLine() {
    const parte = { name: "" }
    setParts((partes) => [...partes, parte])
  }

  function defineWorksArray(nameWork, priceWork, active) {
    // console.log(namePart)
    const work = { nameJob: nameWork, priceJob: priceWork, isActive: active }
    setWorks((works) => [...works, work])
  }

  function defineVoidWorksLine() {
    const work = { nameJob: "", priceJob: null, isActive: false }
    setWorks((works) => [...works, work])
  }

  useEffect(() => {
    defineArray("Bloque", "", "", "", false);
    defineArray("Cigüeñal", "", "", "", false);
    defineArray("Culata", "", "", "", false);
    defineArray("Pistones Usados", "", "", "", false);
    defineArray("Bielas", "", "", "", false);
    defineArray("Valvulas", "", "", "", false);
    defineArray("Tapas de Bancada", "", "", "", false);
    defineArray("Eje de Levas", "", "", "", false);
    defineArray("Carter", "", "", "", false);
    defineArray("Tapon de Resortes", "", "", "", false);

    defineWorksArray("Encamisar Bloque", 15000, false)
    defineWorksArray("Ensamblar pistones", 120000, false)
    defineWorksArray("rectificar cigüeñal", 130000, false)
    defineWorksArray("Cambiar tapones", 20000, false)
  }, [])


  const addOrderBase = () => {
    //console.log(engineName)
    fetch(URI2 + engineName).then((res) => res.json()).then((data) => { setEngineId(data) })

    /* se retorna la id en base al nombre del motor en el campo */
    console.log("La id del motor ", engineName, " es: ", engineId[0].ID_MOTOR)
    setPhone(engineId[0].ID_MOTOR)
    const idMotor = engineId[0].ID_MOTOR
    console.log(idMotor + ', ' +  + ', ' + document)
    const requestOption = {
        method: "POST", 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ID_MOTOR: idMotor,
            ID_TALLER: 205,
            CC_PERSONA: document, 
            ESTADO_ORDEN: "En Espera"
        }),
    };

    console.log(requestOption.body)
    return fetch(URI, requestOption);
  }

  const togglePersonModal = () => {
    setActivePerson(!activePersonModal)
  }

  const toggleWorkshopModal = () => {
    setActiveWorkshop((isActive) => !isActive)
  }

  return (
    <div>
      <Link to='/menu'><button className="btn btn-outline-info"><h1 >Rectimotor</h1></button></Link>


      <h2 className="text-center">   Registro de orden de Ingreso  </h2>
      <div className="container-xl w-100 p-3" >

        <div className="row">
          <div className="col-md-2">
            <label>Taller:</label>
          </div>
          <div className="col-md-3">
            <input onChange={({ target: { value } }) => setWorkshop(value)} type="text" placeholder="Nombre del Taller" value={workshopName} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success" onClick={toggleWorkshopModal}>agregar</button>
          </div>


          <div className="col-md-2">
            <label>Vehiculo:</label>
          </div>
          <div className="col-md-2">
            <input onChange={({ target: { value } }) => setEngineName(value)} type="text" placeholder="Nombre del vehiculo" />
          </div>
        </div>
        <br />


        <div className="row">
          <div className="col-md-2">
            <label>Responsable:</label>
          </div>
          <div className="col-md-3">
            <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Nombre del Responsable" value={name} />
          </div>
          <div className="col-md-2">
            <button className="btn btn-success" onClick={togglePersonModal}>agregar</button>
          </div>


          <div className="col-md-2">
            <label>Ingreso:</label>
          </div>
          <div className="col-md-2">
            <input type="date" placeholder="Fecha de ingreso" readOnly="readOnly" id="current" />
          </div>
        </div>
        <br />


        <div className="row">
          <div className="col-md-2">
            <label>Cedula:</label>
          </div>
          <div className="col-md-5">
            <input onChange={({ target: { value } }) => setDocument(value)} type="text" placeholder="Cedula del responsable" value={document} />
          </div>


          <div className="col-md-2">
            <label>Telefono:
            </label>
          </div>
          <div className="col-md-2">
            <input onChange={({ target: { value } }) => setPhone(value)} type="text" placeholder="Telefono del responsable" value={phone} />
          </div>

        </div>
          <hr/>
          <div className="row">
            <Modal active={activeWorkshopModal} toggle={toggleWorkshopModal}>
              <WorkshopModal toggle={toggleWorkshopModal} workshopName={setWorkshop} />
            </Modal>
            <Modal active={activePersonModal} toggle={togglePersonModal} >
              <PersonModal toggle={togglePersonModal} name={setName} document={setDocument} phone={setPhone} />
            </Modal>
          </div>
          <hr />

        <h1 className="text-center">Partes</h1>

        <div>

          <div className="row">
            <div className="col-sm-4"> <h5 className="font-weight-bold">Partes Recibidas </h5> </div>
            <div className="col-sm-3"> <h5 className="font-weight-bold">Cantidad </h5> </div>
            <div className="col-sm-3"> <h5 className="font-weight-bold">Medidas Iniciales </h5> </div>
            <div className="col-sm-2"> <h5 className="font-weight-bold">Medidas Finales </h5> </div>
          </div>

          {parts.map((part) => {
            // console.log(part)
            return (
              <div>
                <PartFE namePart={part.name ? part.name : ""} quantity={part.quantity ? part.quantity : ""}
                  initialMed={part.initialMed ? part.initialMed : ""} finalMed={part.finalMed ? part.finalMed : ""} isChecked={part.isChecked ? part.isChecked : ""} />
              </div>
            )
          })}

          <div className="row">
            <button onClick={defineVoidLine} className="btn btn-primary btn-lg"><h3>+ Agregar Parte</h3></button>
          </div>

          <div className="row-xl">
            <hr />
            <hr />
          </div>



        </div>
        <div>
          <h1 className="text-center">Trabajos</h1>


          <div className="row">
            <div className="col"> <h5 className="font-weight-bold">Nombre de trabajo </h5> </div>
            <div className="col"> <h5 className="font-weight-bold">Precio del trabajo</h5> </div>
          </div>
          <br />

          {works.map((work) => {
            // console.log(part)
            return (
              <div>
                <JobFE nameJob={work.nameJob ? work.nameJob : ""} priceJob={work.priceJob ? work.priceJob : ""} isActive={work.isActive ? work.isActive : ""} />
                <br />
              </div>
            )
          })}


          <div className="row">
            <button onClick={defineVoidWorksLine} className="btn btn-primary btn-lg"><h3>+ Agregar Trabajo</h3></button>
          </div>
        </div>

        <div className="row">
          <hr />
          <hr />
        </div>
        <br />


        <h1 className="text-center">Estados</h1>
        <div className="row">
          <div className="col-sm">
            <label className="form-check-label" htmlFor="inlineCheckbox1">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              Reparado</label>
          </div>
          <div className="col-sm">
            <label className="form-check-label" htmlFor="inlineCheckbox2">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
              Pagado</label>
          </div>
          <div className="col-sm">
            <label className="form-check-label" htmlFor="inlineCheckbox3">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
              Enviado</label>
          </div>
          <div className="col-sm">
            <label className="form-check-label" htmlFor="inlineCheckbox4">
              <input className="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" />
              Pendiente de repuestos</label>
          </div>
        </div>
        <br />
        <br />
        {/* <Link to='/menu' className="text-decoration-none"> */}
        <div className="row">
          <button className="btn btn-success" onClick={addOrderBase}>
            <h2>Confirmar</h2>
          </button>
        </div>
        {/* </Link> */}
        <Link to='/menu' className="text-decoration-none">
          <div className="row">
            <button className="btn btn-danger">
              <h2 className="text-decoration-none">Descartar</h2>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RegisterOrder;