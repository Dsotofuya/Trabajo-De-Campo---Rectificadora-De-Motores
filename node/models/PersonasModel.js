import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const PersonasModel = db.define('PERSONAS', {
    CC_PERSONA: { type: DataTypes.DECIMAL, primaryKey: true },
    NOMBRES_APELLIDOS: { type: DataTypes.STRING },
    TELEFONO_PERSONA: { type: DataTypes.DECIMAL }
}, { tableName: 'PERSONAS' })

export default PersonasModel;