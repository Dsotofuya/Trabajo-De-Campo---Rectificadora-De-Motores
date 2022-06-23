import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [search, setSearch] = useState('');
  return (
    <div className="App">
      <h1>Consulte el estado de su motor</h1>
      <div className='contenedor-principal'>
        <form onSubmit={ev => {ev.preventDefault(); setSearch(ev.target.search.value)}}>
          <input className='input' type='text' name='search'></input>
          <button className='buton' variant='primary' type='submit'>Buscar</button>
        </form>

        <div className='resultados-busqueda'>
          <p>Resultados para: {search}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
