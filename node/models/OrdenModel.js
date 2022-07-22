import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const OrdenModel = db.define('ORDENES', {
    id_orden: { type: DataTypes.INTEGER, primaryKey: true },
    id_motor: { type: DataTypes.INTEGER },
    id_taller: { type: DataTypes.INTEGER },
    cc_persona: { type: DataTypes.DECIMAL },
    fecha_recibido: { type: DataTypes.DATE },
    fecha_entrega: { type: DataTypes.DATE },
    estado_orden: { type: DataTypes.STRING },
}, { tableName: 'ORDENES' })

export default OrdenModel;