import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const DetallesOrdenModel = db.define('DETALLES_ORDEN', {
    ID_DETALLE_ORDEN: { type: DataTypes.INTEGER, primaryKey: true },
    ID_ORDEN: { type: DataTypes.INTEGER},
    ID_TRABAJO: { type: DataTypes.INTEGER},
    ID_REPUESTO: { type: DataTypes.INTEGER},
    ID_PARTE: { type: DataTypes.INTEGER},
    CANTIDAD: { type: DataTypes.DECIMAL},
    VALOR_TRABAJO: { type: DataTypes.DECIMAL }
}, { tableName: 'DETALLES_ORDEN' })

export default DetallesOrdenModel;