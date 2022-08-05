import React from "react";
import '../estilos/menuButton.css';
import agregar from '../imagenes/plus-icon.png';
import buscar from '../imagenes/search-icon.png';
import actualizar from '../imagenes/pencil-icon.png';
import trabajador from '../imagenes/worker-icon.png'

function MenuButton(props){
    const rutaImagen = (nombreBoton) =>{
        let ruta='';
        if(nombreBoton == 'Registrar orden de ingreso'){
            ruta=agregar;
        }else if(nombreBoton == 'Buscar orden de registro'){
            ruta=buscar;
        }else if(nombreBoton == 'Actualizar orden de registro'){
            ruta=actualizar ;
        }else if(nombreBoton == 'Añadir trabajador'){
            ruta=trabajador;
        }
        return ruta;
    }
    //<button className={`rounded boton-${ props.show ? 'visible' : 'hidden'}`}>
    return(
        <button className={`rounded boton-${ props.show ? 'visible' : 'hidden'}`}>
        <div>
            <p>{props.nombre}</p>
            <img className='imagen-boton' alt='icon' src={rutaImagen(props.nombre)}/>
        </div>
    </button>
    );
}

export default MenuButton;