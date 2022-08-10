import './App.css';


const PartFE = (props) => {
    const handleChangeInitial = (event) => {
        let temp = event.target.value
        console.log(temp)
        props.updater(props.idx, 
            props.part.name, props.part.quantity, props.part.initialMed+" "+temp, props.part.finalMed, props.part.isChecked)
    }

    const handleChangeFinal = (event) => {
        let temp = event.target.value
    }

    return (
        <div>
            <div>
                <div className="row">
                    {console.log()}

                    <div className="col-sm-3 w-1 p-1">
                        <input className="w-1 p-1" type="checkBox" onChange={() =>
                            props.updater(props.idx, props.part.name, props.part.quantity, props.part.initialMed, props.part.finalMed, !props.part.isChecked)
                        } defaultChecked={false} />
                        <label className="w-25 p-10">
                            <input onChange={({ target: { value } }) => props.updater(props.idx, value, props.part.quantity, props.part.initialMed, props.part.finalMed, props.part.isChecked)} id={props.part.ID_PARTE} type="text" placeholder="Nombre de la parte" defaultValue={props.part.NOMBRE_PARTE} />
                        </label>
                    </div>

                    <div className="col-sm-3">
                        <input className="w-80 p-1" onChange={({ target: { value } }) => {
                            props.updater(props.idx, props.part.name, value, props.part.initialMed,
                                props.part.finalMed, props.part.isChecked)
                        }} type="number" placeholder="cantidad" defaultValue={props.part.quantity} />
                    </div>
                    <div className="col-sm-3">
                        <input className="w-80 p-1" onChange={({ target: { value } }) => props.updater(props.idx, props.part.name, props.part.quantity, value, props.part.finalMed, props.part.isChecked)} type="text" placeholder="medidas iniciales" defaultValue={props.part.initialMed} />
                        <select className="form-select form-select-sm w-9 p-1" onChange={handleChangeInitial} >
                            <option value="mm">milimetros (mm)</option>
                            <option value={0}>pulgadas (")</option>
                            <option value={0}>micras (µm)</option>
                        </select>
                    </div>
                    <div className="col-sm-3">
                        <input className="w-80 p-1" onChange={({ target: { value } }) => props.updater(props.idx, props.part.name, props.part.quantity, props.part.initialMed, value, props.part.isChecked)} type="text" placeholder="medidas finales" defaultValue={props.part.finalMed} />
                        <select className="form-select form-select-sm w-9 p-1" onChange={handleChangeFinal} >
                            <option value={"mm"}>milimetros (mm)</option>
                            <option value={"in"}>pulgadas (")</option>
                            <option value={"µm"}>micras (µm)</option>
                        </select>
                    </div>
                </div>
            </div>
            <br />
        </div>

    );
}
export default PartFE;