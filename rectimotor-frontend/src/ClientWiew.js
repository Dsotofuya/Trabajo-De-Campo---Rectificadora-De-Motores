import './App.css';
import {useState} from 'react';
import ClientTab from './ClientTab';

function ClientWiew() {
  const [search, setSearch] = useState('');
  
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
      </div>
    </div>
  );
}

export default ClientWiew;