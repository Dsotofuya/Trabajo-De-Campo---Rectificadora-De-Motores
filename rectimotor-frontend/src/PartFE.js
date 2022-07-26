import './App.css';
import React, { useEffect, useState } from "react";


const PartFE = ({namePart, quantity, initialMed, finalMed, isChecked}) => {
    const [nameP, setName] = useState(""+namePart);
    const [quant, setQuant] = useState(""+quantity);
    const [initialM, setInitial] = useState(""+initialMed);
    const [finalM, setFinal] = useState(""+finalMed);
    const [checked, setChecked] = useState(isChecked);

    useEffect(() => {
        namePart = nameP
        quantity = quant
        initialMed = initialM
        finalMed = finalM
        isChecked = checked
    }, [])
    
    return (
        <div>
            <div>
                <div className="row">

                    <div className="col-sm-4">
                        <input type="checkBox" defaultChecked = {checked} onChange={({ target: { value } }) => setChecked(!checked)}/>
                        <label>
                        <input onChange={({ target: { value } }) => setName(value)} type="text" placeholder="Nombre de la parte" defaultValue={nameP}/>
                        </label>
                    </div>

                    <div className="col-sm-3">
                        <input onChange={({ target: { value } }) => setQuant(value)} type="number" placeholder="cantidad" defaultValue={quant}/>
                    </div>
                    <div className="col-sm-3">
                        <input onChange={({ target: { value } }) => setInitial(value)} type="number" placeholder="medidas iniciales" defaultValue={initialM}/>
                    </div>
                    <div className="col-sm-2">
                        <input onChange={({ target: { value } }) => setFinal(value)} type="number" placeholder="medidas finales" defaultValue={finalM}/>
                    </div>
                </div>
            </div>
            <br/>
        </div>

    );
}
export default PartFE;