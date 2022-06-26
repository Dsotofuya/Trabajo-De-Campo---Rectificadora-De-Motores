import './App.css';
import React from 'react';
//import ClientWiew from './ClientWiew';
import CompShowOrders from './ConsultOrders';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/orders/:id' element={<CompShowOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
