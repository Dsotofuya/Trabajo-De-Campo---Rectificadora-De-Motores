import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const HistoricoReportesModel = db.define('HISTORICOS_MOTORES', {
    ID_HISTORICO : { type: DataTypes.INTEGER, primaryKey: true },
    ID_MEDIDA_INICIAL  : { type: DataTypes.INTEGER},
    ID_MEDIDA_FINAL  : { type: DataTypes.INTEGER},
    ID_DETALLE_ORDEN   : { type: DataTypes.INTEGER}
}, { tableName: 'HISTORICOS_MOTORES' })

export default HistoricoReportesModel;