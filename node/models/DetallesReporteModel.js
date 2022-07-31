import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const DetallesReporteModel = db.define('DETALLES_REPORTE', {
    ID_DETALLE_REPORTE : { type: DataTypes.INTEGER, primaryKey: true },
    ID_REPORTE : { type: DataTypes.INTEGER},
    ID_TRABAJO : { type: DataTypes.INTEGER}
}, { tableName: 'DETALLES_REPORTE' })

export default DetallesReporteModel;