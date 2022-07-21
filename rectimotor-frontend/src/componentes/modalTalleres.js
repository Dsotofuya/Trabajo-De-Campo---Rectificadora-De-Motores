import React from "react";

const Modal = () => {
    return (
        <div>
            <h1>Registro de nuevo taller</h1>

            <div className="container">

                <div className="row">

                    <div className="col">
                        <label>Nombre del taller</label>
                    </div>

                    <div className="col">
                        <input type="text" placeholder="Nombre" />
                    </div>

                </div>

                <div className="row-sm">

                    <div className="col">
                        <label>Cantidad Ingresada</label>
                    </div>

                    <div className="col">
                        <input type="number" placeholder="Cantidad" />
                    </div>

                </div>

                <div className="row-sm">

                    <div className="col">
                        <label>Medida de la parte</label>
                    </div>

                    <div className="col">
                        <input type="number" placeholder="Medida" />
                    </div>



                </div>

            </div>
        </div>
    )
}

export default Modal;