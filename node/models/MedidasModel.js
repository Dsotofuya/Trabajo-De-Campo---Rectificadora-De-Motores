import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const MedidasModel = db.define('MEDIDAS', {
    ID_MEDIDA  : { type: DataTypes.INTEGER, primaryKey: true },
    ID_PARTE   : { type: DataTypes.INTEGER},
    NOMBRE_MEDIDA   : { type: DataTypes.STRING},
    VALOR_MEDIDA: {type: DataTypes.FLOAT}
}, { tableName: 'MEDIDAS' })

export default MedidasModel;