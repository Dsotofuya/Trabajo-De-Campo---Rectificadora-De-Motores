import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const OrdenModel = db.define('ORDENES', {
    id_orden: { type: DataTypes.DECIMAL, primaryKey: true },
    id_motor: { type: DataTypes.DECIMAL },
    id_taller: { type: DataTypes.DECIMAL },
    cc_persona: { type: DataTypes.DECIMAL },
    placa: { type: DataTypes.STRING },
    fecha_recibido: { type: DataTypes.DATE },
    fecha_entrega: { type: DataTypes.DATE },
    estado_orden: { type: DataTypes.STRING },
}, { tableName: 'ORDENES' })

export default OrdenModel;