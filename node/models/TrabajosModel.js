import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const TrabajosModel = db.define('TRABAJOS', {
    ID_TRABAJO : { type: DataTypes.DECIMAL, primaryKey: true },
    NOMBRE_TRABAJO: { type: DataTypes.DECIMAL },
    VALOR_TRABAJO: { type: DataTypes.STRING }
}, { tableName: 'TRABAJOS' })

export default TrabajosModel;