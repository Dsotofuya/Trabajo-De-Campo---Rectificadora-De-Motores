import './App.css';
import React from 'react';
import Login from './componentes/Login';
import CompShowOrders from './CompShowOrders';
import CompShowReport from './CompShowReport.js';
import WorkshopModal from './componentes/WorkshopModal.js';
import PersonModal from './componentes/PersonModal.js';
import Menu from './componentes/Menu.js';
import RegisterOrder from './RegisterOrder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './componentes/NavBar';

function App() {
  return (
    
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/menu/agregar' element={<RegisterOrder />}/>
        <Route path='/menu/buscar' element={<CompShowOrders />}/>
        <Route path='/menu/actualizar' element={<CompShowOrders />}/>
        <Route path='/orders/:id' element={<CompShowOrders />} />
        <Route path='/orders/details/:id_order' element={<CompShowReport />} />
        {/* esto es de prueba */}
        <Route path='/orders/workshopModal' element={<WorkshopModal />} />
        <Route path='/orders/personModal' element={<PersonModal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
