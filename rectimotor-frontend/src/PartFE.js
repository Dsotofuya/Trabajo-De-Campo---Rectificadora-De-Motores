import './App.css';
import React, { useState } from "react";


const PartFE = ({namePart}) => {
    const [nameP, setName] = useState(""+namePart);
    return (
        <div>
            <div>
                <div className="row">

                    <div className="col-sm-1">
                        <input type="checkBox"></input>
                    </div>
                    <div className="col-sm-3">
                        <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Nombre de la parte" value={nameP}/>
                    </div>

                    <div className="col-sm-3">
                        <input type="number" placeholder="cantidad" />
                    </div>
                    <div className="col-sm-3">
                        <input type="number" placeholder="medidas iniciales" />
                    </div>
                    <div className="col-sm-2">
                        <input type="number" placeholder="medidas finales" />
                    </div>
                </div>
            </div>
            <br/>
        </div>
    );
}
export default PartFE;