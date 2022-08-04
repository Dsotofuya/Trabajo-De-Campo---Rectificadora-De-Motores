import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MenuButton from "./MenuButton";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
    const [nickName, setNickname] = useState('');
    const [password, setPass] = useState('');
    const [user, setUser] = useState('');

    const URI = 'http://localhost:3412/users/'
    const params = useParams()
    const navigate = useNavigate()
   
   console.log(user)
    
    function searchUser (){
        fetch(URI + nickName).then((res) => res.json()).then((data) => { setUser(data) })
        if(user != '' && user[0].CONTRASENIA_USUARIO == password){
            navigate('/menu')
            
        }else{
           alert('Contraseña o usuario incorrectos')
        }
           
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.window}>
                <h2 className="text-center">Iniciar Sesion</h2>
                <br />
                <br />
                <div className="row">

                    <div className="col">
                        <label>Usuario: </label>
                    </div>

                    <div className="col">
                        <input
                            onChange={({ target: { value } }) => {
                                setNickname(value)
                                }}
                            type="text" placeholder="Nombre de usuario" />
                    </div>

                </div>

                <br />

                <div className="row">

                    <div className="col">
                        <label>Contraseña: </label>
                    </div>

                    <div className="col">
                        <input
                            onChange={({ target: { value } }) => setPass(value)}
                           type="password" placeholder="Ingrese su contraseña" />
                    </div>

                </div>

                <br />

                <div className="col text-center">
                    <button 
                    style={styles.acceptBtn} 
                    className="btn btn-info btn-center"
                    onClick={searchUser}
                    ><h3 className="text-decoration-none">Ingresar</h3></button>
                </div>
                    </div>
                    <div style={styles.background}/>    
        </div>
    );
}

const styles = {
    wrapper:{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    window: {
        position: 'relative',
        background: '#fff',
        borderRadius:5,
        border: '2px solid #d0d0d0',
        padding:15,
        boxShadow: '2px 2px 10px rgba(0,0,0,0,3)',
        zIndex:10,
        minWidth:320
    },

    acceptBtn:{
        margin:'0 auto',
        display: 'flex',
        justifyContent:'center',
        alignItems: 'bottom',
        top:0, 
        right:0
    },

    background:{
        position: 'absolute',
        width:'100%',
        height:'100%',
        top:0, 
        left:0,
        background:'#000',
        opacity:0.4
    }
}

export default Login;