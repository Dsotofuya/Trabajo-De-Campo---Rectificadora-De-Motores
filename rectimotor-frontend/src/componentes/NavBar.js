import React, { useState } from "react";
import {Link} from 'react-router-dom';
//import * as FaIcons from 'react-icons/fa';
//import * as AiIcons from 'react-icons/ai';
import {FaBars} from 'react-icons/fa';
import {AiOutlineClose} from 'react-icons/ai';
import { NavBarContent } from "./NavBarContent";
import '../estilos/navBar.css'

const NavBar = () => {
    const [sideBar, setSidebar] = useState(false);
    const showSideBar = () => setSidebar(!sideBar)

    return(
    <>
    <div className="navbar">
        <Link to="#" className="bars-button">
            <FaBars onClick={showSideBar}/>
        </Link>
    </div>
    <nav className={sideBar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-elements" onClick={showSideBar}>
            <li className="nav-element">
                <Link to='#' className="bars-button">
                    <AiOutlineClose/>
                </Link>
            </li>
            {NavBarContent.map((item, index) => {
                return(
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                )
            })}
        </ul>
    </nav>
    </>
    );
}

export default NavBar;