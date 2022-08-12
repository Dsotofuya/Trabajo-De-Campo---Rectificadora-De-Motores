import './App.css';

const ReplacementFE = (props) => {

    return (
        <div className="row">
            <div>
                <div className="row">

                    <div className="col-sm">
                        <input type="checkBox" name="flexRadioDefault" id="flexRadioDefault1" 
                        onChange={() => {
                        props.updater(props.idx, props.replacement.nameRep, props.replacement.quantity, !props.replacement.isActive)}} defaultChecked = {props.replacement.isActive}/>
                        
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                        <input onChange={({ target: { value } }) =>{
                            props.updater(props.idx, value, props.replacement.quantity, props.replacement.isActive)
                            }} type="text" defaultValue={props.replacement.nameRep} placeholder="nombre del repuesto"/>
                        </label>
                    </div>
                    <div className='col-sm'>
                        <div className='row'>
                                <input onChange={({ target: { value } }) => 
                                props.updater(props.idx, props.replacement.nameRep, 
                                value, props.replacement.isActive)} type="number" 
                                defaultValue={props.replacement.quantity} placeholder="cantidad de repuestos"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ReplacementFE;