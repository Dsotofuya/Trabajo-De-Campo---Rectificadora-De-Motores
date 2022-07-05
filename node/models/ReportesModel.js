import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const ReportesModel = db.define('REPORTES', {
    ID_REPORTE: { type: DataTypes.DECIMAL, primaryKey: true },
    CC_PERSONA : { type: DataTypes.DECIMAL },
    TOTAL: { type: DataTypes.DECIMAL }
}, { tableName: 'REPORTES' })

export default ReportesModel;