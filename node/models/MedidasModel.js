import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const MedidasModel = db.define('MEDIDAS', {
    ID_MEDIDA  : { type: DataTypes.DECIMAL, primaryKey: true },
    ID_MOTOR   : { type: DataTypes.DECIMAL},
    ID_PARTE   : { type: DataTypes.DECIMAL},
    NOMBRE_MEDIDA   : { type: DataTypes.STRING},
    VALOR_MEDIDA: {type: DataTypes.FLOAT}
}, { tableName: 'MEDIDAS' })

export default MedidasModel;