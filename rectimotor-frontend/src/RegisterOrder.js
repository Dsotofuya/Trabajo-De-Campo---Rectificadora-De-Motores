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
  const [vehicle, setVehicle] = useState(false);
  const [parts, setParts] = useState([]);
  const [works, setWorks] = useState([]);
  const [engineName, setEngineName] = useState([]);
  const [engineId, setEngineId] = useState([]);

  function defineArray(namePart) {
    // console.log(namePart)
    const parte = { name: namePart }
    setParts((partes) => [...partes, parte])
  }

  function defineVoidLine() {
    const parte = { name: "" }
    setParts((partes) => [...partes, parte])
  }

  function defineWorksArray(nameWork, priceWork) {
    // console.log(namePart)
    const work = { nameJob: nameWork, priceJob: priceWork }
    setWorks((works) => [...works, work])
  }

  function defineVoidWorksLine() {
    const work = { nameJob: "", priceJob:null}
    setWorks((works) => [...works, work])
  }

  useEffect(() => {
    defineArray("Bloque");
    defineArray("Cigüeñal");
    defineArray("Culata");
    defineArray("Pistones Usados");
    defineArray("Bielas");
    defineArray("Valvulas");
    defineArray("Tapas de Bancada");
    defineArray("Eje de Levas");
    defineArray("Carter");
    defineArray("Tapon de Resortes");

    defineWorksArray("Encamisar Bloque", 200000)
    defineWorksArray("Ensamblar pistones", 120000)
    defineWorksArray("rectificar cigüeñal", 130000)
    defineWorksArray("Cambiar tapones", 20000)
  }, [])


  const addOrderBase = async () => {
    //console.log(engineName)
    await fetch(URI2 + engineName).then((res) => res.json()).then((data) => { setEngineId(data) })

    /* se retorna la id en base al nombre del motor en el campo */
    console.log("La id del motor ", engineName, " es: ", engineId[0].ID_MOTOR)
    //const idMotor = await fetch(URI2 + workshopName)
    // console.log(idMotor + ', ' + idWorkshop + ', ' + document)
    // const requestOption = {
    //     method: "POST", 
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //         ID_MOTOR: workShopName, 
    //         ID_TALLER: OwnerName, 
    //         CC_PERSONA: document
    //     }),
    // };

    // console.log(requestOption.body)
    // return fetch(URI, requestOption);
  }

  const getNum = (doc) => {
    setDocument(doc)
  }

  const togglePersonModal = () => {
    setActivePerson(!activePersonModal)
  }

  const toggleWorkshopModal = () => {
    setActiveWorkshop((isActive) => !isActive)
  }

  const addGenericLine = () => {
    return (
      <div>
        <PartFE />
      </div>
    )
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
            <input onChange={({ target: { value } }) => setVehicle(value)} type="text" placeholder="Nombre del vehiculo" />
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
            <input type="date" placeholder="Fecha de ingreso" readonly="readonly" id="current" />
          </div>
        </div>
        <br />


        <div className="row">
          <div className="col-md-2">
            <label>Cedula:</label>
          </div>
          <div className="col-md-5">
            <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Cedula del responsable" value={document} />
          </div>


          <div className="col-md-2">
            <label>Telefono:
            </label>
          </div>
          <div className="col-md-2">
            <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Telefono del responsable" value={phone} />
          </div>

        </div>
        <p>
          <hr />
          <div className="row">
            <Modal active={activeWorkshopModal} toggle={toggleWorkshopModal}>
              <WorkshopModal toggle={toggleWorkshopModal} workshopName={setWorkshop} />
            </Modal>
            <Modal active={activePersonModal} toggle={togglePersonModal} >
              <PersonModal toggle={togglePersonModal} name={setName} document={setDocument} phone={setPhone} />
            </Modal>
          </div>
          <hr />
        </p>

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
                <PartFE namePart={part.name ? part.name : ""} />
              </div>
            )
          })}

          <div className="row">
            <button onClick={defineVoidLine}><p>+ agregar parte</p></button>
          </div>

          <p>
            <hr />
            <hr />
          </p>



        </div>
        <div>
          <h1 className="text-center">Trabajos</h1>


          <div className="row">
            <div className="col"> <h5 className="font-weight-bold">Nombre de trabajo </h5> </div>
            <div className="col"> <h5 className="font-weight-bold">Precio del trabajo</h5> </div>
          </div>
          <br/>

          {works.map((work) => {
            // console.log(part)
            return (
              <div>
                <JobFE nameJob={work.nameJob ? work.nameJob : ""} priceJob={work.priceJob ? work.priceJob : ""} />
                <br />
              </div>
            )
          })}


          <div className="row">
            <button onClick={defineVoidWorksLine}><p>+ agregar Trabajo</p></button>
          </div>
        </div>

        <p>
          <hr />
          <hr />
        </p>

        <h1 className="text-center">Estados</h1>
        <div className="row">
          <div className="col-sm">
            <label class="form-check-label" for="inlineCheckbox1">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
              Reparado</label>
          </div>
          <div className="col-sm">
            <label class="form-check-label" for="inlineCheckbox2">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2" />
              Pagado</label>
          </div>
          <div className="col-sm">
            <label class="form-check-label" for="inlineCheckbox3">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3" />
              Enviado</label>
          </div>
          <div className="col-sm">
            <label class="form-check-label" for="inlineCheckbox4">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox4" value="option4" />
              Pendiente de repuestos</label>
          </div>
        </div>
        {/* <Link to='/menu' className="text-decoration-none"> */}
        <div className="row">
          <button className="btn btn-success" onClick={addOrderBase}>
            <h1>Confirmar</h1>
          </button>
        </div>
        {/* </Link> */}
        <Link to='/menu' className="text-decoration-none">
          <div className="row">
            <button className="btn btn-danger">
              <h1 className="text-decoration-none">Descartar</h1>
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RegisterOrder;