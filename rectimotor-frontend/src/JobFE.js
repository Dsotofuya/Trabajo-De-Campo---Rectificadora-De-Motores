import { useEffect, useState } from 'react';
import './App.css';

const JobFE = (props) => {
    // props
    // { nameJob, priceJob, isActive}
    const[nameJ, setName] = useState('')
    const[priceJ, setprice] = useState('')
    const[Active, setActive] = useState(false)

    // useEffect(() => {
    //     props.nameJob = nameJ
    //     props.priceJob = priceJ
    //     props.isActive = Active
    // }, [])

    return (
        <div className="row">
            <div>
                <div className="row">

                    <div className="col-sm">
                        <input type="checkBox" name="flexRadioDefault" id="flexRadioDefault1" 
                        onChange={() => {
                        props.updater(props.idx, props.Job.nameJob, props.Job.priceJob, !props.Job.isActive)}} defaultChecked = {props.Job.isActive}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                        <input onChange={({ target: { value } }) =>{
                            props.updater(props.idx, value, props.Job.priceJob, props.Job.isActive)
                            }} type="text" defaultValue={props.Job.nameJob} placeholder="nombre del trabajo"/>
                        </label>
                    </div>
                    <div className='col-sm'>
                        <div className='row'>
                                <input onChange={({ target: { value } }) => props.updater(props.idx, props.Job.nameJob, value, !props.Job.isActive)} type="number" defaultValue={props.Job.priceJob} placeholder="precio del trabajo"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default JobFE;