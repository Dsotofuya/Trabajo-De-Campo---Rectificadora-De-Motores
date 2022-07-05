import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const NuevosRepuestosModel = db.define('NUEVOS_REPUESTOS', {
    ID_REPUESTO  : { type: DataTypes.DECIMAL, primaryKey: true },
    NOMBRE_REPUESTO   : { type: DataTypes.STRING}
}, { tableName: 'NUEVOS_REPUESTOS' })

export default NuevosRepuestosModel;