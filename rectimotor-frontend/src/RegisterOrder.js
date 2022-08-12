import React, { useEffect, useState } from "react";
import './ROrder.css';
import PartFE from "./PartFE";
import JobFE from "./JobFE";
import { Link } from 'react-router-dom';
import WorkshopModal from "./componentes/WorkshopModal";
import PersonModal from "./componentes/PersonModal";
import Modal from "./componentes/Modal";
import NavBar from "./componentes/NavBar";
import ReplacementFE from "./ReplacementFE";
import sweetAlert from 'sweetalert';

function RegisterOrder() {
  const [activePersonModal, setActivePerson] = useState(false);
  const [activeWorkshopModal, setActiveWorkshop] = useState(false);
  const URI = "https://rectimotor-server.herokuapp.com/orders/";
  const URI2 = "https://rectimotor-server.herokuapp.com/engines/name/";
  const URIEngines = "https://rectimotor-server.herokuapp.com/engines/";
  const URIEnginesCount = "https://rectimotor-server.herokuapp.com/engines/count/";
  const URIPersons = "https://rectimotor-server.herokuapp.com/persons";
  const URIMeasures = "https://rectimotor-server.herokuapp.com/measures/";
  const URIMeasuresName = "https://rectimotor-server.herokuapp.com/measures/name/";
  const URIHistoric = "https://rectimotor-server.herokuapp.com/historic/";
  const URIMeasuresCount = "https://rectimotor-server.herokuapp.com/measures/count/";
  const URIWorkshops = "https://rectimotor-server.herokuapp.com/workshops/name/"
  const URIAllWorkshops = "https://rectimotor-server.herokuapp.com/workshops/"
  const URIWorks = "https://rectimotor-server.herokuapp.com/works/"
  const URIDetails = "https://rectimotor-server.herokuapp.com/DetOrd/"
  const URIParts = "https://rectimotor-server.herokuapp.com/parts/"
  const URIReplacements = "https://rectimotor-server.herokuapp.com/newreplacement/"

  const [name, setName] = useState("");
  const [IDOrder, setIDOrder] = useState("");
  const [document, setDocument] = useState("");
  const [phone, setPhone] = useState("");
  // const [workshopName, setWorkshop] = useState("");
  const [orderDate, setOrderDate] = useState(new Date())
  // const [vehicle, setVehicle] = useState(false);

  //listas de partes, trabajos y repuestos
  const [parts, setParts] = useState([]);
  const [works, setWorks] = useState([]);
  const [replacements, setReplacements] = useState([]);
  const [lastPartId, setLastPartId] = useState("")
  const [initialMeasureId, setInitialMeasureId] = useState("")
  const [finalMeasureId, setFinalMeasureId] = useState("")
  const [currentMeasureId, setCurrentMeasureId] = useState("")

  //constantes de motores
  const [engineName, setEngineName] = useState("");
  const [engineId, setEngineId] = useState("");
  const [engineCount, setEngineCount] = useState("");
  const [currentDetailID, setCurrentDetailID] = useState("");

  // constantes de talleres
  const [workshopID, setWorkshopId] = useState("");
  const [workshops, setWorkshops] = useState([])

  //Datos de sesión de usuadio
  let user = JSON.parse(localStorage.getItem('Logged user'));
  let validation = user[0].TIPO_USUARIO == 'Administrador';

  function autoSetUsser(value) {
    setDocument(value)
    fetch(URIPersons + "/" + value).then((res) => res.json()).then((data) => {
      if (data[0] != null) {
        setName(data[0].NOMBRES_APELLIDOS)
        setPhone(data[0].TELEFONO_PERSONA)
      }
    })
  }


  const getAllWorkshops = () => {
    fetch(URIAllWorkshops).then(async (res) => setWorkshops(await res.json()))
  }

  function autoGetVehicleID(value) {
    setEngineName(value)
    fetch(URI2 + value).then(async (res) => (await res.json())).then((data) => {
      let temp = data[0]
      if (temp != null) {
        let num = temp.ID_MOTOR
        setEngineId(num)
      }
    })
  }

  function getEngineCount() {
    fetch(URIEnginesCount).then((res) => res.json()).then((data) => {
      let temp = data[0]
      let num = temp.ID_MOTOR + 1
      setEngineCount(num)
    })
  }

  function sendAll() {
    // console.log(engineId)
    // console.log(engineCount)
    if (engineName == "") {
      //aca va la notificacion de error
      sweetAlert("falta el motor")
    }
    else {

      if (engineId > 0) {
        addOrderBase()
        sendTheWorksToDB(IDOrder)
        sendThePartsToDB(IDOrder)
        sendTheReplacementsToDB(IDOrder)
      }
      else {
        sendVehicle()
        addOrderBaseAlter(engineCount)
        sendTheWorksToDB(IDOrder)
        sendThePartsToDB(IDOrder)
        setEngineId(engineCount)
        sendTheReplacementsToDB(IDOrder)

      }
    }
  }

  function sendVehicle() {
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        NOMBRE_MOTOR: engineName
      })
    }
    fetch(URIEngines, requestOption)
    console.log(engineName)
  }

  //funcion para enviar trabajos a DB
  async function sendTheWorksToDB(idOrder) {
    works.map((work) => {
      if (work.isActive || work.priceJob > 0) {
        if (work.ID_TRABAJO >= 0) {
          const requestOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ID_ORDEN: idOrder,
              ID_TRABAJO: work.ID_TRABAJO,
              VALOR_TRABAJO: work.priceJob
            })
          }
          fetch(URIDetails, requestOption)
          console.log(idOrder + ', ' + work.ID_TRABAJO + ', ' + work.priceJob)
        }
        else {
          coordinateWorksUploads(idOrder, work.priceJob, work.NOMBRE_TRABAJO)
        }
      }
    })
  }


  //funcion para enviar partes a DB
  function sendThePartsToDB(idOrder) {
    parts.map((part) => {
      if (part.isChecked || part.quantity > 0) {
        if (part.ID_PARTE > 0) {
          uploadDetailPart(idOrder, part.ID_PARTE, part.quantity)
          getLastDetailID()
          uploadMeasures(part.initialMed, part.finalMed, part.currentDetailID, part.ID_PARTE)
        }
        else {
          uploadNewPart(part.name)
          getPartIdByName(part.name)
          uploadDetailPart(idOrder, lastPartId, part.quantity)
        }
      }
    })
  }



  async function coordinateWorksUploads(idOrder, priceJob, nameJob) {
    let thisId = 0
    thisId = await lastWorkID()
    uploadNewWork(nameJob)
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_ORDEN: idOrder,
        ID_TRABAJO: thisId,
        VALOR_TRABAJO: priceJob
      })
    }
    //una cochinada que sirve
    setTimeout(sendAnithing(URIDetails, requestOption), 5000)
    //
    console.log("agregacion de detalle" + idOrder + ', ' + thisId + ', ' + priceJob)
  }

  function sendAnithing(linkTo, datas) {
    fetch(linkTo, datas)
  }

  //funcion para enviar repuestos
  async function sendTheReplacementsToDB(idOrder) {
    replacements.map(async(replacement) => {
      if (replacement.isActive || replacement.quantity > 0) {
        let idRep = await searchReplacement(replacement)
        if (idRep >= 0) {
          const requestOption = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ID_ORDEN: idOrder,
              ID_REPUESTO: idRep,
              CANTIDAD: replacement.quantity
            })
          }
          fetch(URIDetails, requestOption)
          console.log(idOrder + ', ' + replacement.idRep + ', ' + replacement.quantity)
        }
        else {
          coordinateReplacementsUploads(idOrder, replacement.quantity, replacement.nameRep)
        }
      }
    })
  }

  const searchReplacement = (replacement) => {
    return new Promise((resolve, reject) => {
      fetch(URIReplacements + "name/" + replacement.nameRep).then((res) => res.json()).then((data) => {
        let temp = data
        // console.log("temp: " + temp)
        if (temp === undefined) {
          resolve(-1)
        }
        else {
          let num = temp[0].ID_REPUESTO
          console.log("idActual obtenida: " + num)
          resolve(num)
          reject(0)
        }
      })
    })
  }

  async function coordinateReplacementsUploads(idOrder, quantity, nameRep) {
    let idRep = 0
    idRep = await lastRepID()
    uploadReplacement(nameRep)
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_ORDEN: idOrder,
        ID_REPUESTO: idRep,
        CANTIDAD: quantity
      })
    }
    //una cochinada que sirve
    setTimeout(sendAnithing(URIDetails, requestOption), 5000)
    //
    console.log("agregacion de detalle" + idOrder + ', ' + idRep + ', ' + quantity)
  }

  const uploadReplacement = (NOMBRE_REPUESTO) => {
    return new Promise(() => {
      const requestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NOMBRE_REPUESTO: NOMBRE_REPUESTO
        })
      }
      fetch(URIReplacements, requestOption)
    })
  }

  const lastRepID = () => {
    return new Promise((resolve, reject) => {
      fetch(URIReplacements + "count").then((res) => res.json()).then((data) => {
        let temp = data[0]
        console.log("temp: " + temp)
        let num = temp.ID_REPUESTO + 1
        console.log("idActual obtenida: " + num)
        resolve(num)
        reject(0)
      })
    })
  }

  const uploadNewWork = (NOMBRE_TRABAJO) => {
    return new Promise(() => {
      const requestOption = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          NOMBRE_TRABAJO: NOMBRE_TRABAJO
        })
      }
      fetch(URIWorks, requestOption)
    })
  }

  const lastWorkID = () => {
    return new Promise((resolve, reject) => {
      fetch(URIWorks + "count/").then((res) => res.json()).then((data) => {
        let temp = data[0]
        console.log("temp: " + temp)
        let num = temp.ID_TRABAJO + 1
        console.log("idActual obtenida: " + num)
        resolve(num)
        reject(0)
      })
    })
  }

  async function uploadMeasures(initialMed, finalMed, currentDetailID, ID_PARTE) {
    let finalId = 0
    let initialId = 0
    let currentId = 0
    if (initialMed != "" && finalMed != "") {
      initialId = await getInitialMeasureId(initialMed, ID_PARTE)
      finalId = await getFinalMeasureId(finalMed, ID_PARTE)
      console.log("pasa a la primera")
      console.log("a" + initialId)
      console.log("e" + finalId)
      if (initialId !== 0 && finalId !== 0) {
        uploadHistoric(initialId, finalId, currentDetailID)
      }
      else {
        currentId = await getCurrentIdMeasureID()
        if (initialId !== 0) {
          uploadMeasure(ID_PARTE, finalMed)
          uploadHistoric(initialId, currentId, currentDetailID)
        }
        if (finalId !== 0) {
          currentId = await getCurrentIdMeasureID()
          uploadMeasure(ID_PARTE, initialMed)
          uploadHistoric(currentId, finalId, currentDetailID)
        }
      }
    }
    else {
      if (initialMed !== "") {
        initialId = await getInitialMeasureId(initialMed, ID_PARTE)
        if (initialId > 0) {
          uploadHistoric(initialId, 0, currentDetailID)
        } else {
          uploadMeasure(ID_PARTE, initialMed)
          currentId = await getCurrentIdMeasureID()
          uploadHistoric(currentId, 0, currentDetailID)
        }
      }
      if (finalMed !== 0) {
        finalId = await getFinalMeasureId(finalMed, ID_PARTE)
        if (finalId > 0) {
          uploadHistoric(0, finalId, currentDetailID)
        }
        else {
          uploadMeasure(ID_PARTE, finalMed)
          currentId = await getCurrentIdMeasureID()
          uploadHistoric(0, currentId, currentDetailID)
        }
      }
    }
  }

  const getCurrentIdMeasureID = () => {
    return new Promise((resolve, reject) => {
      fetch(URIMeasuresCount).then((res) => res.json()).then((data) => {
        let temp = data[0]
        console.log("temp: " + temp)
        let num = temp.ID_MEDIDA
        console.log("idActual obtenida: " + num)
        resolve(num)
        reject(0)
      })
    })
  }


  //funciones para obtener el id de las medidas
  const getInitialMeasureId = (VALOR_MEDIDA, ID_PARTE) => {
    return new Promise((resolve, reject) => {
      fetch(URIMeasuresName + ID_PARTE + "&" + VALOR_MEDIDA).then((res) =>
        res.json()).then((data) => {
          let temp = data[0]
          if (temp == undefined) {
            resolve(-1)
            console.log("es indefinido")
          }
          else {
            let num = temp.ID_MEDIDA
            console.log("idmedida obtenida: " + num)
            resolve(num)
            reject(0)
          }
        })
    })
  }

  const getFinalMeasureId = (VALOR_MEDIDA, ID_PARTE) => {
    return new Promise((resolve, reject) => {
      fetch(URIMeasuresName + ID_PARTE + "&" + VALOR_MEDIDA).then((res) => res.json()).then((data) => {
        let temp = data[0]
        console.log("temp: " + temp)
        if (temp == undefined) {
          resolve(-1)
          console.log("es indefinido")
        }
        else {

          let num = temp.ID_MEDIDA
          console.log("idmedida obtenida: " + num)
          setFinalMeasureId(num)
          resolve(num)
          reject(0)
        }
      })
    })

  }

  function getLastDetailID() {
    fetch(URIDetails + "count/").then((res) => res.json()).then((data) => { setCurrentDetailID(data) })
  }

  function getPartIdByName(name) {
    fetch(URIParts + "name/" + name).then((res) => res.json()).then((data) => {
      let temp = data
      console.log("temp: " + temp)
      let num = temp.ID_PARTE
      console.log("temp: " + num)

      setLastPartId(num)
    })
  }

  function uploadNewPart(name) {
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        NOMBRE_PARTE: name
      })
    }
    fetch(URIParts, requestOption)
    console.log(name)
  }

  //funcion para subir detalles de parte a db
  function uploadDetailPart(idOrder, ID_PARTE, quantity) {
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_ORDEN: idOrder,
        ID_PARTE: ID_PARTE,
        CANTIDAD: quantity,
        // no sé como meter lo de medida inicial y final, dejo una medida comentada
        // VALOR_MEDIDA : part.initialMed,
        // VALOR_MEDIDA : part.finalMed
      })
    }
    fetch(URIDetails, requestOption)
    console.log(idOrder + ', ' + ID_PARTE + ', ' + quantity)
  }

  //funcion que envia medidas a la base de datos
  function uploadMeasure(ID_PARTE, measureValue) {
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_PARTE: ID_PARTE,
        VALOR_MEDIDA: measureValue
      })
    }
    fetch(URIMeasures, requestOption)
    console.log("Medida agregada: " + ID_PARTE + ', ' + measureValue)
  }

  //funcion que envia historicos con medidas a la base de datos
  function uploadHistoric(ID_MEDIDA_INICIAL, ID_MEDIDA_FINAL, ID_DETALLE_ORDEN) {
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_MEDIDA_INICIAL: ID_MEDIDA_INICIAL,
        ID_MEDIDA_FINAL: ID_MEDIDA_FINAL,
        ID_DETALLE_ORDEN: ID_DETALLE_ORDEN
      })
    }
    fetch(URIHistoric, requestOption)
    console.log("Historico agregado: " + ID_MEDIDA_INICIAL + ', ' + ID_MEDIDA_FINAL + ", " + ID_DETALLE_ORDEN)
  }

  function getAllParts() {
    fetch(URIParts).then((res) => res.json()).then((data) => { setParts(data) })
  }

  function getAllWorks() {
    fetch(URIWorks).then((res) => res.json()).then((data) => { setWorks(data) })
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

  function printfm() {
    console.log(finalMeasureId)
  }

  async function partMapTrial() {
    // console.log(IDOrder) // :3

    // getCurrentIdMeasureID()
    // console.log(currentMeasureID)

    // uploadMeasures("15mm", "20mm", 25, 0)
    // console.log("se va")

    sendTheReplacementsToDB(43)
    // replacements.map((replacement) => {
    //   console.log("id: " + 0 + "; nombre: " + replacement.nameRep + "; cantidad: " + replacement.quantity )
    // })

    // let temp = works[0]
    // console.log(temp)
    // let mun = 0
    // mun = await getFinalMeasureId(2, 0)
    // console.log("mun " + mun)

    // mun = await getInitialMeasureId(3, 0)
    // console.log("mun " + mun)


    // parts.map((part) => {
    //   if (part.isChecked || part.quantity > 0)
    //     console.log("nombre: " + part.NOMBRE_PARTE + "; cantidad: " + part.quantity + "; iMed: " + part.initialMed + "; fMed: " + part.finalMed + "; activo: " + part.isChecked)
    // })
  }

  function updateWork(index, NOMBRE_TRABAJO, price, checked) {
    let worksTemp = [...works]
    worksTemp[index].NOMBRE_TRABAJO = NOMBRE_TRABAJO
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

  function updateReplacement(index, nameRep, quantity, isActive) {
    let replacementTemp = [...replacements]
    replacementTemp[index].nameRep = nameRep
    replacementTemp[index].quantity = quantity
    replacementTemp[index].isActive = isActive
    setReplacements(replacementTemp)
  }

  const addOrderBase = () => {
    const idMotor = engineId
    const idWorkshop = workshopID
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_MOTOR: engineId,
        ID_TALLER: workshopID,
        CC_PERSONA: document,
        ESTADO_ORDEN: "En Espera",
        FECHA_RECIBIDO: orderDate
      }),
    };
    console.log("Agregada la orden base" + idMotor + ', ' + idWorkshop + ', ' + document)
    return fetch(URI, requestOption);
  }

  const addOrderBaseAlter = (num) => {
    const idWorkshop = workshopID
    const requestOption = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ID_MOTOR: num,
        ID_TALLER: workshopID,
        CC_PERSONA: document,
        ESTADO_ORDEN: "En Espera",
        FECHA_RECIBIDO: orderDate
      }),
    };
    console.log(num + ', ' + idWorkshop + ', ' + document)
    return fetch(URI, requestOption);
  }

  const togglePersonModal = () => {
    setActivePerson(!activePersonModal)
  }

  const toggleWorkshopModal = () => {
    setActiveWorkshop((isActive) => !isActive)
    // getAllWorkshops()
  }

  const handleChange = (event) => {
    getAllWorkshops()
    let temp = event.target.value
    setWorkshopId(temp);
    console.log(temp)
    console.log(workshopID)
  }

  useEffect(() => {
    getEngineCount()
    getAllParts()
    getAllWorkshops()
    getAllWorks()
    fetch(URI + "/count").then((res) => res.json()).then((data) => { setIDOrder(data[0].ID_ORDEN + 1) })
  }, [])

  return (
    <>

      <div style={styles.window} className={"border"} >
        <NavBar />

        <div className="row">
          <div className="col-md-9">
            <h2 className="text-center"> Registro de orden de Ingreso  </h2>
          </div>
          <div className="col-md-3 border border border-info">
            <h1 className="text-center text-info">#{IDOrder}</h1>
          </div>
        </div>

        <div className="container-xl w-100 p-3" >

          <div className="row">

            <div className="col-md-2" >
              <label>Taller:</label>
            </div>
            <div className="col-md-3">
              <select className="form-select form-select-sm" onChange={handleChange} >
                <option value={0}>  </option>
                {workshops.map((wShops) =>
                  <option value={wShops.ID_TALLER}> {wShops.NOMBRE_TALLER} </option>
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
              <input onChange={({ target: { value } }) => autoGetVehicleID(value)} type="text" placeholder="Nombre del vehiculo" />
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
              <input type="date" placeholder="Fecha de ingreso" id="current" onChange={({ target: { value } }) => {
                setOrderDate(value)
                console.log(value)
              }} />
            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-md-2">
              <label>Cedula:</label>
            </div>
            <div className="col-md-5">
              <input onChange={({ target: { value } }) => autoSetUsser(value)} type="text" placeholder="Cedula del responsable" value={document} />
            </div>


            <div className="col-md-2">
              <label>Telefono:
              </label>
            </div>
            <div className="col-md-2">
              <input onChange={({ target: { value } }) => setPhone(value)} type="text" placeholder="Telefono del responsable" value={phone} />
            </div>

          </div>
          <hr />
          <div className="row">
            <Modal active={activeWorkshopModal} toggle={toggleWorkshopModal}>
              <WorkshopModal toggle={toggleWorkshopModal} getWshops={getAllWorkshops} />
            </Modal>
            <Modal active={activePersonModal} toggle={togglePersonModal}>
              <PersonModal toggle={togglePersonModal} name={setName} document={setDocument} phone={setPhone}/>
            </Modal>
          </div>
          <hr />

          <h1 className="text-center">Partes</h1>

          {/* <div className="row">
            <button className="btn btn-warning btn-lg" onClick={partMapTrial}>probar</button>
          </div> */}
          <br />
          <br />

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

            {/* <div className="row">
              <button className="btn btn-warning btn-lg" onClick={workMapTrial}>probar mapa de Trabajos</button>
            </div> */}

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
              <div className="col"> <h5 className="font-weight-bold">Cantidad del repuesto</h5> </div>
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
                <input className="form-check-input" type="radio" id="inlineCheckbox1" value="option1" name="option" />
                Reparado</label>
            </div>
            <div className="col-sm">
              <label className="form-check-label" htmlFor="inlineCheckbox2">
                <input className="form-check-input" type="radio" id="inlineCheckbox2" value="option2" name="option" />
                Pagado</label>
            </div>
            <div className="col-sm">
              <label className="form-check-label" htmlFor="inlineCheckbox3">
                <input className="form-check-input" type="radio" id="inlineCheckbox3" value="option3" name="option" />
                Enviado</label>
            </div>
            <div className="col-sm">
              <label className="form-check-label" htmlFor="inlineCheckbox4">
                <input className="form-check-input" type="radio" id="inlineCheckbox4" value="option4" name="option" />
                Pendiente de repuestos</label>
            </div>
          </div>
          <br />
          <br />
          {/* <Link to='/menu' className="text-decoration-none"> */}
          <div className="row">
            <button className="btn btn-success" onClick={sendAll}>
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
    padding: 20,
    boxShadow: '2px 2px 20px rgba(0,0,0,0,3)',
    zIndex: 10,
    Width: "200hv",
    minWidth: 400
  },
}

export default RegisterOrder;