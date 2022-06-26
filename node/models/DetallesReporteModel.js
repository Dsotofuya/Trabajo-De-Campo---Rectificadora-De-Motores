import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const DetallesReporteModel = db.define('DETALLES_REPORTE', {
    ID_DETALLE_REPORTE : { type: DataTypes.DECIMAL, primaryKey: true },
    ID_REPORTE : { type: DataTypes.DECIMAL},
    ID_TRABAJO : { type: DataTypes.DECIMAL}
}, { tableName: 'DETALLES_REPORTE' })

export default DetallesReporteModel;