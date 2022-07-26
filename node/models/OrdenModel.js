import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const OrdenModel = db.define('ORDENES', {
    ID_ORDEN: { type: DataTypes.INTEGER, primaryKey: true },
    ID_MOTOR: { type: DataTypes.INTEGER },
    ID_TALLER: { type: DataTypes.INTEGER },
    CC_PERSONA: { type: DataTypes.DECIMAL },
    FECHA_RECIBIDO: { type: DataTypes.DATE },
    FECHA_ENTREGA: { type: DataTypes.DATE },
    ESTADO_ORDEN: { type: DataTypes.STRING },
}, { tableName: 'ORDENES' })

export default OrdenModel;