import './App.css';
import React from 'react';
import Login from './componentes/Login';
import RegisterUser from './componentes/RegisterUser';
import CompShowOrders from './CompShowOrders';
import CompShowOrdersLogged from './CompShowOrdersLogged';
import CompShowReport from './CompShowReport.js';
import WorkshopModal from './componentes/WorkshopModal.js';
import UpdateOrder from './componentes/UpdateOrder.js';
import PersonModal from './componentes/PersonModal.js';
import Menu from './componentes/Menu.js';
import RegisterOrder from './RegisterOrder';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchUpdate from './componentes/SearchUpdate';

function App() {
  return (
    <>
    <BrowserRouter>
    
      <div className='app'>
      <Routes>
        <Route path='/menu' element={<Menu />}/>
        <Route path='/' element={<CompShowOrders />}></Route>
        <Route path='/buscar' element={<CompShowOrdersLogged />}></Route>
        <Route path='/login' element={<Login />}/>
        <Route path='/registrar' element={<RegisterUser />}/>
        <Route path='/agregar' element={<RegisterOrder />}/>
        {/**<Route path='/menu/buscar' element={<CompShowOrders />}/> */}
        <Route path='/Busqueda_Actualizar' element={<SearchUpdate />}/>
        <Route path='/orders/:id' element={<CompShowOrdersLogged />} />
        {/**<Route path='/menu/actualizar' element={<UpdateOrder />}/> */}
        <Route path='/actualizar' element={<SearchUpdate />}/>
        <Route path='/orders/details/:id_order' element={<CompShowReport />} />
        <Route path='/orders/get/:id_order' element={<UpdateOrder />} />
        {/* esto es de prueba */}
        <Route path='/orders/workshopModal' element={<WorkshopModal />} />
        <Route path='/orders/personModal' element={<PersonModal />} />
      </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
