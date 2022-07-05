import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const MotorModel = db.define('MOTORES', {
    id_motor: { type: DataTypes.DECIMAL, primaryKey: true },
    nombre_motor: { type: DataTypes.STRING }
}, { tableName: 'MOTORES' })

export default MotorModel;