import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import bars from '../imagenes/bars.png';
import close from '../imagenes/close.png';
import { NavBarContent } from "./NavBarContent";
import '../estilos/navBar.css'

const NavBar = () => {
    const [sideBar, setSidebar] = useState(false);
    const showSideBar = () => setSidebar(!sideBar)

    let user = '';
    const setUser= () => {
        user = JSON.parse(localStorage.getItem('Logged user'))
        console.log(user)
        return user;
    }

    let userName =localStorage.getItem('User name');
    setUser()

    return(
    <>
    <div className="navbar">
        <Link to="#" className="bars-button">
            <img className="navIcon" src={bars} onClick={showSideBar}/>
        </Link>
    </div>
    <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-elements" onClick={showSideBar}>
            <li className="nav-element">
                <Link to='#' className="bars-button">
                    <img className="navIcon" src={close}/>
                </Link>
            </li>
            
            <li className="nav-text">
                <span>{user[0].TIPO_USUARIO}</span>
            </li>

            <li className="nav-text">{userName}</li>
            {NavBarContent.map((item, index) => {
                return(
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
            <li className="nav-text">
                <Link to={'/login'} onClick= {console.log('0_0')}>
                    <span>Cerrar sesión</span>
                   
                </Link>

                
            </li>
        </ul>
    </nav>
    </>
    );
}

export default NavBar;