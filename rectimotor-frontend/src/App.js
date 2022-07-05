import './App.css';
import React from 'react';
import CompShowOrders from './ConsultOrders';
import CompShowReport from './CompShowReport.js';
import Menu from './componentes/Menu.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/menu/agregar' element={<Menu />}/>
        <Route path='/menu/buscar' element={<Menu />}/>
        <Route path='/menu/actualizar' element={<Menu />}/>
        <Route path='/orders/:id' element={<CompShowOrders />} />
        <Route path='/orders/details/:id_order' element={<CompShowReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
