import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const TalleresModel = db.define('TALLERES', {
    ID_TALLER: { type: DataTypes.DECIMAL, primaryKey: true },
    NOMBRE_TALLER: { type: DataTypes.STRING },
    NOMBRE_PROPIETARIO: { type: DataTypes.STRING },
    TELEFONO_TALLER: { type: DataTypes.DECIMAL }
}, { tableName: 'TALLERES' })

export default TalleresModel;