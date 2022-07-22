import React, {Component} from "react";
import Portal from "./Portal";

export default class Modal extends Component{
    render(){
        const {children, toggle, active} = this.props;

        return(
            <Portal>
                {active&& (
                <div style={styles.wrapper}>
                    <div style={styles.window}>
                        <button className="btn btn-danger" onClick={toggle}>X</button>
                        <div>{children}</div>
                    </div>
                    <div onClick={toggle} style={styles.background}/>
                </div>
                )}
            </Portal>
        )
    }
}

const styles ={
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

    closeBtn:{
        position: 'absolute',
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