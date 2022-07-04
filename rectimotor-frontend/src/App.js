import './App.css';
import React from 'react';
//import ClientWiew from './ClientWiew';
import CompShowOrders from './ConsultOrders';
import CompShowReport from './CompShowReport.js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/orders/:id' element={<CompShowOrders />} />
        <Route path='/orders/details/:id_order' element={<CompShowReport />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
