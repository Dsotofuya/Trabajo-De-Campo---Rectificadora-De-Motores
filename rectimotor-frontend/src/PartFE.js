import './App.css';

const PartFE = ({namePart}) => {
    return (
        <div>
            <div>
                <div className="row">

                    <div className="col-sm">
                        <p>
                        <input type="checkBox"/>
                        {namePart}
                        </p>

                    </div>
                    <div className="col-sm">
                        <input type="number" placeholder="cantidad" />
                    </div>
                    <div className="col-sm">
                        <input type="number" placeholder="medidas iniciales" />
                    </div>
                    <div className="col-sm">
                        <input type="number" placeholder="medidas finales" />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PartFE;