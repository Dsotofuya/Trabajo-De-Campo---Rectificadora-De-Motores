import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import sweetAlert from 'sweetalert';
import bcryptjs from 'bcryptjs';

function RegisterUser() {
    const [nickName, setNickname] = useState('');
    const [password, setPass] = useState('');
    const [passConfirmation, setPassConfirmation] = useState('');
    const URI = 'https://rectimotor-server.herokuapp.com/users/'
    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem('Logged user'));
    
   useEffect(() => {
        if(user[0].TIPO_USUARIO != 'Administrador'){
          navigate('/')
        }
    }, [])
    const addUser = () => {
       
        let passwordEncripted = bcryptjs.hashSync(password, 8);

        if(nickName != ''){
            if(password == passConfirmation){
                const requestOption = {
                    method: "POST", 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        NOMBRE_USUARIO: nickName, 
                        CONTRASENIA_USUARIO: passwordEncripted, 
                        TIPO_USUARIO: 'Trabajador'
                    }),
                };
                sweetAlert('Usuario registrado');
                fetch(URI, requestOption); 
                navigate('/logged/buscar');
            }else{
                sweetAlert('La contraseña no coincide');
                navigate('/registrar')
            }
        }else{
            sweetAlert('Debe ingresar un nombre');
            navigate('/registrar')
        }
    }

    return (
        <div style={styles.wrapper}>
            <div style={styles.window}>
                <h2 className="text-center">Registrar trabajador</h2>
                <br />
                <br />
                <div className="row">

                    <div className="col">
                        <label>Usuario: </label>
                    </div>

                    <div className="col">
                        <input
                        onChange={({ target: { value } }) => {setNickname(value)}}
                        type="text" placeholder="Nombre de usuario"/>
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
                           type="password" placeholder="Contraseña"/>
                    </div>

                </div>

                <br />

                <div className="row">
                        <div className="col">
                            <label>Confirmación de contraseña: </label>
                        </div>

                        <div className="col">
                            <input
                            onChange={({ target: { value } }) => setPassConfirmation(value)}
                            type="password" placeholder="Contraseña"/>
                        </div>

                   
                </div>

                <br />

               
                    <div className="col text-center" onClick={addUser}>
                        <button 
                        style={styles.acceptBtn} 
                        className="btn btn-info btn-center"
                        
                        ><h3 className="text-decoration-none">Registrar</h3></button>
                        
                    </div>

                    <div className="col">
                        <Link to='/logged/buscar'>
                        <button 
                        style={styles.acceptBtn} 
                        className="btn btn-info btn-center"
                        
                        ><h3 className="text-decoration-none">Salir</h3></button>
                        </Link>
                        
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
        marginTop: '10px',
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

export default RegisterUser;