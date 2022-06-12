import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const OrdenModel =  db.define('ORDENES', {
    ID_ORDEN: { type: DataTypes.DECIMAL },
    ID_MOTOR: { type: DataTypes.DECIMAL },
    ID_TALLER: { type: DataTypes.DECIMAL },
    CC_PERSONA: { type: DataTypes.DECIMAL },
    PLACA: { type: DataTypes.STRING },
    FECHA_RECIBIDO: { type: DataTypes.DATE },
    FECHA_ENTREGA: {type: DataTypes.DATE},
    ESTADO_ORDEN: {type: DataTypes.STRING},
})

export default OrdenModel;