import MenuButton from "./MenuButton";
import {Link} from 'react-router-dom';
import React, { useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import sweetAlert from 'sweetalert';

function Menu(){

  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('Logged user'));
  let userName =localStorage.getItem('User name');

  useEffect(() => {
    if(user == null){
      sweetAlert('No se ha iniciado sesión, redirigiendo a Log in...')
      navigate('/login')
    }

    if(user!= null){
      sweetAlert('Bienvenido ' + user[0].TIPO_USUARIO + " " + userName)
      
    }
}, [])

  function addWorker(){
    let condition = false;
    if(user[0].TIPO_USUARIO == 'Administrador'){
       condition = true
    }
    return condition;
  }

    /**<div className='usuario'>
        <h3>{user[0].TIPO_USUARIO}: {userName}</h3>
      </div> */
    return(
    <div className="menu">
      
      <Link to='/menu/agregar'><MenuButton nombre='Registrar orden de ingreso' show={true}/></Link>
      <Link to='/menu/buscar'> <MenuButton nombre='Buscar orden de registro' show={true}/></Link>
      <Link to='/menu/actualizar'><MenuButton nombre='Actualizar orden de registro' show={true}/></Link>
      <Link to='/registrar'><MenuButton nombre='Añadir trabajador' show={addWorker()}/></Link>
    </div> 
    );
}

export default Menu;