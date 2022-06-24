import './App.css';
import {useState} from 'react';
import ClientTab from './ClientTab';

function ClientWiew() {
  const [search, setSearch] = useState('');
  let person1 = {
    nameMotor: "Land Rover",
    nameWorkshop: "Serviteca",
    ownerName: "Julio",
    ownerId:"123",
    engineStatus: "En espera"
  }

  let person2 = {
    nameMotor: "Bugatti Chiron",
    nameWorkshop: "Serviteca",
    ownerName: "Marco",
    ownerId:"456",
    engineStatus: "Reparado"
  }

  let person3 = {
    nameMotor: " Ford Super Duty",
    nameWorkshop: "Serviteca",
    ownerName: "Elias",
    ownerId:"1051212617",
    engineStatus: "Enviado"
  }

  let personNull = {
    nameMotor: "",
    nameWorkshop: "",
    ownerName: "",
    ownerId:"",
    engineStatus: ""
  }

  let noEncontrado = {
    nameMotor: "No encontrado",
    nameWorkshop: "No encontrado",
    ownerName: "No encontrado",
    ownerId:"No encontrado",
    engineStatus: "No encontrado"
  }

  let personasPrueba = [person1, person2, person3];

  function resultado(search){
    let persona;
    if(search==''){
      persona=personNull;
    }
    else if(personasPrueba.includes(search) == false){
      persona=noEncontrado;
    }
    for(let i=0; i<personasPrueba.length;i++){
      if(search==personasPrueba[i].ownerId){
        persona=personasPrueba[i];
      }
    }
    return persona;
  }

  return (
    <div className="App">
      <div className='contenedor-principal'>
        <h1>Consulte el estado de su motor</h1>
        <form onSubmit={ev => {ev.preventDefault(); setSearch(ev.target.search.value)}}>
          <input className='input' type='text' name='search'></input>
          <button className='buton' variant='primary' type='submit'>Buscar</button>
        </form>

        <p>Resultados para: {search}</p>

        <ClientTab
            nameMotor= {resultado(search).nameMotor}
            nameWorkshop= {resultado(search).nameWorkshop}
            ownerName= {resultado(search).ownerName}
            ownerId= {resultado(search).ownerId}
            engineStatus= {resultado(search).engineStatus}
            />
        
        {/* <div className='resultados-busqueda'>
          <p>Nombre del motor:</p>
          <p>Nombre del taller:</p>
          <p>Nombre del propietario:</p>
          <p>Cédula del propietario: {search}</p>
        </div>

        <p>Estado del motor:</p> */}
      </div>
    </div>
  );
}

export default ClientWiew;