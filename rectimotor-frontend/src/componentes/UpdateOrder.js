import React, { useEffect, useState } from "react";
import '../ROrder.css';
import PartFE from "../PartFE";
import JobFE from "../JobFE";
import { Link } from 'react-router-dom';
import WorkshopModal from "../componentes/WorkshopModal";
import PersonModal from "../componentes/PersonModal";
import Modal from "../componentes/Modal";
import NavBar from "../componentes/NavBar";
import ReplacementFE from "../ReplacementFE";

function UpdateOrder(props) {

    const [activePersonModal, setActivePerson] = useState(false);
    const [activeWorkshopModal, setActiveWorkshop] = useState(false);
    const URI = "http://localhost:3412/orders/";
    const URI2 = "http://localhost:3412/engines/name/";
    const URIWorkshops = "http://localhost:3412/workshops/name/"
    const URIAllWorkshops = "http://localhost:3412/workshops/"
    const URIWorks = "http://localhost:3412/works/"
    const URIParts = "http://localhost:3412/parts/"
    const URIReps = "http://localhost:3412/replacements/"

    const [name, setName] = useState("");
    const [document, setDocument] = useState("");
    const [phone, setPhone] = useState("");
    const [workshopName, setWorkshop] = useState("");
    // const [vehicle, setVehicle] = useState(false);

    //listas de partes, trabajos y repuestos
    const [parts, setParts] = useState([]);
    const [works, setWorks] = useState([]);
    const [replacements, setReplacements] = useState([]);

    //constantes de motores
    const [engineName, setEngineName] = useState([]);
    const [engineId, setEngineId] = useState("");

    // constantes de talleres
    const [workshopID, setWorkshopId] = useState("");
    const [workshops, setWorkshops] = useState([])

    function getAllWorkshops() {
        fetch(URIAllWorkshops).then((res) => res.json()).then((data) => { setWorkshops(data) })
    }

    //funcion para enviar trabajos a DB
    function sendTheWorksToDB(idOrder) {
        works.map((work) => {
            //falta verificacion si no tiene id de trabajo
            if (work.isActive || work.priceJob != "") {
                const requestOption = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ID_ORDEN: idOrder,
                        ID_TRABAJO: work.ID_TRABAJO,
                        NOMBRE_TRABAJO: work.NOMBRE_TRABAJO,
                        VALOR_TRABAJO: work.priceJob
                    })
                }
                fetch(URIWorks, requestOption)
            }
        })
    }


    //funcion para enviar partes a DB
    function sendThePartsToDB(idOrder) {
        parts.map((part) => {
            //falta verificacion si no tiene id de partes
            if (part.isChecked || part.quantity != "") {
                const requestOption = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ID_ORDEN: idOrder,
                        ID_PARTE: part.ID_PARTE,
                        NOMBRE_PARTE: part.NOMBRE_PARTE,
                        CANTIDAD: part.quantity,
                        //no sé como meter lo de medida inicial y final, dejo una medida comentada
                        VALOR_MEDIDA: part.initialMed,
                        // VALOR_MEDIDA : part.finalMed
                    })
                }
                fetch(URIParts, requestOption)
            }
        })
    }

    //funciones get, revisar la uri para autocargar los componentes
    function getAllParts() {
        // fetch(URIParts+props.Order.ID_ORDEN).then((res) => res.json()).then((data) => { setParts(data) })
        fetch(URIParts).then((res) => res.json()).then((data) => { setParts(data) })
    }

    function getAllWorks() {
        fetch(URIWorks).then((res) => res.json()).then((data) => { setWorks(data) })
        // fetch(URIWorks+props.Order.ID_ORDEN).then((res) => res.json()).then((data) => { setWorks(data) })
    }

    function getAllReplacements() {
        // fetch(URIReps+props.Order.ID_ORDEN).then((res) => res.json()).then((data) => { setReplacements(data) })
        fetch(URIReps).then((res) => res.json()).then((data) => { setReplacements(data) })
    }

    function defineVoidLine() {
        const part = { name: "", quantity: "", initialMed: "", finalMed: "", isChecked: false }
        setParts((partes) => [...partes, part])
    }

    function defineVoidWorksLine() {
        const work = { nameJob: "", priceJob: null, isActive: false }
        setWorks((works) => [...works, work])
    }

    function defineVoidReplacementLine() {
        const replacement = { nameRep: "", measure: null, isActive: false }
        setReplacements((replacements) => [...replacements, replacement])
    }

    function workMapTrial() {
        works.map((work) => {
            console.log("id: " + work.ID_TRABAJO + "; nombre: " + work.nameJob + "; precio: " + work.priceJob + "; activo: " + work.isActive)
        })
    }

    function partMapTrial() {
        parts.map((part) => {
            console.log("nombre: " + part.ID_PARTE + "; cantidad: " + part.NOMBRE_PARTE + "; iMed: " + part.initialMed + "; fMed: " + part.finalMed + "; activo: " + part.isChecked)
        })
    }

    function updateWork(index, name, price, checked) {
        let worksTemp = [...works]
        worksTemp[index].nameJob = name
        worksTemp[index].priceJob = price
        worksTemp[index].isActive = checked
        setWorks(worksTemp)
    }

    function updatePart(index, name, quant, iMed, fMed, checked) {
        let partsTemp = [...parts]
        partsTemp[index].name = name
        partsTemp[index].quantity = quant
        partsTemp[index].initialMed = iMed
        partsTemp[index].finalMed = fMed
        partsTemp[index].isChecked = checked
        setParts(partsTemp)
    }

    function updateReplacement(index, nameRep, measure, isActive) {
        let replacementTemp = [...replacements]
        replacementTemp[index].nameRep = nameRep
        replacementTemp[index].measure = measure
        replacementTemp[index].isActive = isActive
        setReplacements(replacementTemp)
    }

    useEffect(() => {
        getAllParts();
        getAllWorkshops();
        getAllWorks();
        getAllReplacements();

        /*defineWorksArray("Encamisar Bloque", 15000, false)
        defineWorksArray("Ensamblar pistones", 120000, false)
        defineWorksArray("rectificar cigüeñal", 130000, false)
        defineWorksArray("Cambiar tapones", 20000, false)*/
    }, [])


    const addOrderBase = () => {
        fetch(URI2 + engineName).then((res) => res.json()).then((data) => { setEngineId(data) })
        fetch(URIWorkshops + workshopName).then((res) => res.json()).then((data) => { setWorkshopId(data) })

        /* se retorna la id en base al nombre del motor en el campo */
        setPhone(engineId[0].ID_MOTOR)
        const idMotor = engineId[0].ID_MOTOR
        const idWorkshop = workshopID[0].ID_TALLER
        console.log(idMotor + ', ' + + ', ' + document)
        const requestOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ID_MOTOR: idMotor,
                ID_TALLER: idWorkshop,
                CC_PERSONA: document,
                ESTADO_ORDEN: "En Espera"
            }),
        };
        return fetch(URI, requestOption);
    }

    const togglePersonModal = () => {
        setActivePerson(!activePersonModal)
    }

    const toggleWorkshopModal = () => {
        setActiveWorkshop((isActive) => !isActive)
    }

    return (
        <>

            <div style={styles.window}>
                <NavBar />
                <h2 className="text-center"> Actualizacion de orden de Ingreso  </h2>
                <div className="container-xl w-100 p-3" >

                    <div className="row">
                        <div className="col-md-2">
                            <label>Taller:</label>
                        </div>
                        <div className="col-md-3">
                            <select className="form-select form-select-sm">
                                {workshops.map((wShops) =>
                                    <option key={wShops.array}> {wShops.NOMBRE_TALLER} </option>
                                )
                                }

                            </select>
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
                            {/* <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Nombre del Responsable" value={name} defaultValue={props.persona.NOMBRES_APELLIDOS}/> */}
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
                            {/* <input onChange={({ target: { value } }) => setDocument(value)} type="text" placeholder="Cedula del responsable" value={document} defaultValue={props.persona.CC_PERSONA}/> */}
                            <input onChange={({ target: { value } }) => setDocument(value)} type="text" placeholder="Cedula del responsable" value={document} />
                        </div>


                        <div className="col-md-2">
                            <label>Telefono:
                            </label>
                        </div>
                        <div className="col-md-2">
                            {/* <input onChange={({ target: { value } }) => setPhone(value)} type="text" placeholder="Telefono del responsable" value={phone} defaultValue={props.persona.TELEFONO_PERSONA}/> */}
                            <input onChange={({ target: { value } }) => setPhone(value)} type="text" placeholder="Telefono del responsable" value={phone} />
                        </div>

                    </div>
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

                    <h1 className="text-center">Partes</h1>

                    <div className="row">
                        <button className="btn btn-warning btn-lg" onClick={partMapTrial}>probar mapa de Trabajos</button>
                    </div>

                    <div>

                        <div className="row">
                            <div className="col-sm-4"> <h5 className="font-weight-bold">Partes Recibidas </h5> </div>
                            <div className="col-sm-3"> <h5 className="font-weight-bold">Cantidad </h5> </div>
                            <div className="col-sm-3"> <h5 className="font-weight-bold">Medidas Iniciales </h5> </div>
                            <div className="col-sm-2"> <h5 className="font-weight-bold">Medidas Finales </h5> </div>
                        </div>

                        {parts.map((part, i) => {
                            return (
                                <div>
                                    <PartFE idx={i} part={part} updater={updatePart} />
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
                            <button className="btn btn-warning btn-lg" onClick={workMapTrial}>probar mapa de Trabajos</button>
                        </div>

                        <div className="row">
                            <div className="col"> <h5 className="font-weight-bold">Nombre de trabajo </h5> </div>
                            <div className="col"> <h5 className="font-weight-bold">Precio del trabajo</h5> </div>
                        </div>
                        <br />

                        {works.map((work, i) => {
                            // console.log(i)
                            return (
                                <div>
                                    <JobFE idx={i} Job={work} updater={updateWork}></JobFE>
                                    {/* <JobFE nameJob={work.nameJob} priceJob={work.priceJob} isActive={work.isActive} /> */}
                                    <br />
                                </div>
                            )
                        })}



                        <div className="row">
                            <button onClick={defineVoidWorksLine} className="btn btn-primary btn-lg"><h3>+ Agregar Trabajo</h3></button>
                        </div>
                    </div>

                    <br />
                    <hr />
                    <hr />
                    <br />

                    <div>
                        <h1 className="text-center">Repuestos</h1>

                        {/* <div className="row">
        <button className="btn btn-warning btn-lg" onClick={workMapTrial}>probar mapa de Trabajos</button>
      </div> */}
                        <br />
                        <br />

                        <div className="row">
                            <div className="col"> <h5 className="font-weight-bold">Nombre del repuesto </h5> </div>
                            <div className="col"> <h5 className="font-weight-bold">Medida del repuesto</h5> </div>
                        </div>
                        <br />

                        {replacements.map((replacement, i) => {
                            // console.log(i)
                            return (
                                <div>
                                    <ReplacementFE idx={i} replacement={replacement} updater={updateReplacement}></ReplacementFE>
                                    <br />
                                </div>
                            )
                        })}



                        <div className="row">
                            <button onClick={defineVoidReplacementLine} className="btn btn-primary btn-lg"><h3>+ Agregar Repuesto</h3></button>
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
            <div style={styles.background} />
        </>
    );
};

const styles = {
    background: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        // background: '#000',
        opacity: 0.4
    },
    window: {
        position: 'relative',
        background: '#fff',
        borderRadius: 5,
        border: '2px solid #d0d0d0',
        padding: 15,
        boxShadow: '2px 2px 10px rgba(0,0,0,0,3)',
        zIndex: 10,
        minWidth: 320
    },
}

export default UpdateOrder;