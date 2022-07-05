import React from "react";
import MenuButton from "./MenuButton";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Link} from 'react-router-dom';

function Menu(){
    return(
    <div className="menu">
      <Link to='/menu/agregar'><MenuButton nombre='Registrar orden de ingreso'/></Link>
      <Link to='/menu/buscar'> <MenuButton nombre='Buscar orden de registro'/></Link>
      <Link to='/menu/actualizar'><MenuButton nombre='Actualizar orden de registro'/></Link>
    </div>
    );
}

export default Menu;