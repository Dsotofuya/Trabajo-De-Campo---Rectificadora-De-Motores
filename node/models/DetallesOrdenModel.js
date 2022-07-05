import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const DetallesOrdenModel = db.define('DETALLES_ORDEN', {
    ID_DETALLE_ORDEN: { type: DataTypes.DECIMAL, primaryKey: true },
    ID_ORDEN: { type: DataTypes.DECIMAL},
    ID_TRABAJO: { type: DataTypes.DECIMAL},
    ID_REPUESTO: { type: DataTypes.DECIMAL},
    ID_PARTE: { type: DataTypes.DECIMAL},
    CANTIDAD: { type: DataTypes.DECIMAL},
}, { tableName: 'DETALLES_ORDEN' })

export default DetallesOrdenModel;