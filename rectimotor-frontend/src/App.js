import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Consulte el estado de su motor</h1>
      <div className='contenedor-principal'>
        <form>
          <input className='input' type='text' name='Buscar'></input>
          <button className='buton' variant='primary' type='submit'>Buscar</button>
        </form>
      </div>
    </div>
  );
}

export default App;
