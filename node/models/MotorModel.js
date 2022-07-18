import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const MotorModel = db.define('MOTORES', {
    ID_MOTOR: { type: DataTypes.INTEGER, primaryKey: true },
    NOMBRE_MOTOR: { type: DataTypes.STRING }
}, { tableName: 'MOTORES' })

export default MotorModel;