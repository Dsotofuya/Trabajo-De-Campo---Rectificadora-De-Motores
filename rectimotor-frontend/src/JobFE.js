import './App.css';

const JobFE = (props) => {

    return (
        <div className="row">
            <div>
                <div className="row">

                    <div className="col-sm">
                        <input type="checkBox" name="flexRadioDefault" id="flexRadioDefault1" 
                        onChange={() => {
                        props.updater(props.idx, props.Job.NOMBRE_TRABAJO, props.Job.priceJob, !props.Job.isActive)}} defaultChecked = {false}
                        disabled={props.show}/>
                        
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                        <input onChange={({ target: { value } }) =>{
                            props.updater(props.idx, value, props.Job.priceJob, props.Job.isActive)
                            }} type="text" id={props.Job.ID_TRABAJO} defaultValue={props.Job.NOMBRE_TRABAJO} placeholder="nombre del trabajo"
                            disabled={props.show}/>
                        </label>
                    </div>
                    <div className='col-sm'>
                        <div className='row'>
                                <input onChange={({ target: { value } }) => props.updater(props.idx, props.Job.NOMBRE_TRABAJO, value, props.Job.isActive)} 
                                onClick={({ target: { value } }) => props.updater(props.idx, props.Job.NOMBRE_TRABAJO, value, !props.Job.isActive)} type="number" defaultValue={props.Job.priceJob} placeholder="precio del trabajo"
                                disabled={props.show}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default JobFE;