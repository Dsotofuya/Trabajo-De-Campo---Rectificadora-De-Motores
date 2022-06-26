import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const HistoricoReportesModel = db.define('HISTORICOS_MOTORES', {
    ID_HISTORICO : { type: DataTypes.DECIMAL, primaryKey: true },
    ID_MEDIDA_INICIAL  : { type: DataTypes.DECIMAL},
    ID_MEDIDA_FINAL  : { type: DataTypes.DECIMAL},
    ID_DETALLE_ORDEN   : { type: DataTypes.DECIMAL}
}, { tableName: 'HISTORICOS_MOTORES' })

export default HistoricoReportesModel;