import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const PartesModel = db.define('PARTES', {
    ID_PARTE   : { type: DataTypes.INTEGER, primaryKey: true },
    NOMBRE_PARTE   : { type: DataTypes.STRING}
}, { tableName: 'PARTES' })

export default PartesModel;