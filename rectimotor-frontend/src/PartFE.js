import './App.css';

const PartFE = (props) => {
    
    return (
        <div>
            <div>
                <div className="row">
                        {console.log()}

                    <div className="col-sm-4">
                        <input type="checkBox" onChange={() => 
                        props.updater(props.idx, props.part.name, props.part.quantity, props.part.initialMed, props.part.finalMed, !props.part.isChecked)
                        } defaultChecked = {props.part.isChecked}/>
                        <label>
                        <input onChange={({ target: { value } }) => props.updater(props.idx, value, props.part.quantity, props.part.initialMed, props.part.finalMed, props.part.isChecked)} type="text" placeholder="Nombre de la parte" defaultValue={props.part.name}/>
                        </label>
                    </div>

                    <div className="col-sm-3">
                        <input onChange={({ target: { value } }) => props.updater(props.idx, props.part.name, value, props.part.initialMed, props.part.finalMed, props.part.isChecked)} type="number" placeholder="cantidad" defaultValue={props.part.quantity}/>
                    </div>
                    <div className="col-sm-3">
                        <input onChange={({ target: { value } }) => props.updater(props.idx, props.part.name, props.part.quantity, value, props.part.finalMed, props.part.isChecked)} type="number" placeholder="medidas iniciales" defaultValue={props.part.initialMed}/>
                    </div>
                    <div className="col-sm-2">
                        <input onChange={({ target: { value } }) => props.updater(props.idx, props.part.name, props.part.quantity, props.part.initialMed, value, props.part.isChecked)} type="number" placeholder="medidas finales" defaultValue={props.part.finalMed}/>
                    </div>
                </div>
            </div>
            <br/>
        </div>

    );
}
export default PartFE;