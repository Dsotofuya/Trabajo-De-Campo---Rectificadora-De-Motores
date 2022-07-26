import './App.css';

const JobFE = ({ nameJob, priceJob, isActive}) => {
    return (
        <div className="row">
            <div>
                <div className="row">

                    <div className="col-sm">
                        <input type="checkBox" name="flexRadioDefault" id="flexRadioDefault1" 
                        onChange={({ target: {value}}) => isActive = (!isActive)} defaultChecked = {isActive}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                        <input onChange={({ target: { value } }) => nameJob = (value)} type="text" defaultValue={nameJob} placeholder="nombre del trabajo"/>
                        </label>
                    </div>
                    <div className='col-sm'>
                        <div className='row'>
                                <input onChange={({ target: { value } }) => nameJob = (value)} type="number" defaultValue={priceJob} placeholder="precio del trabajo"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default JobFE;