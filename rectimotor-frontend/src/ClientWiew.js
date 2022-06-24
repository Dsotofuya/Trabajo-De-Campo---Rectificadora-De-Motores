import './App.css';
import {useState} from 'react';
import ClientTab from './ClientTab';

function ClientWiew() {
  const [search, setSearch] = useState('');
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
        nameMotor= "Land Rover"
        nameWorkshop= "Serviteca"
        ownerName= "Julio"
        ownerId= "123"
        engineStatus= "en espera"
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