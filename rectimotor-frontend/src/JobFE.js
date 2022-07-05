import './App.css';

const JobFE = ({ nameJob, priceJob }) => {
    return (
        <div className="row">
            <div>
                <div className="row">

                    <div className="col-sm">

                        <input class="form-check-input" type="checkBox" name="flexRadioDefault" id="flexRadioDefault1" />
                        <label class="form-check-label" for="flexRadioDefault1">
                            {nameJob}
                        </label>

                    </div>
                    <div className='col-sm'>
                        <div className='row'>
                            <div className="col-sm">
                                <label>
                                    {nameJob}
                                </label>
                            </div>

                            <div className="col-sm">
                                <input type="number" defaultValue={priceJob} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default JobFE;