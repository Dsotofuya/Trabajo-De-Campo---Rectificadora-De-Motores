import db from "../db/RectimotorDB.js";
import { DataTypes } from "sequelize";

const UsuariosModel = db.define('USUARIOS', {
    ID_USUARIO : { type: DataTypes.INTEGER, primaryKey: true },
    NOMBRE_USUARIO: { type: DataTypes.STRING },
    CONTRASENIA_USUARIO: { type: DataTypes.STRING },
    TIPO_USUARIO: { type: DataTypes.STRING }
}, { tableName: 'USUARIOS' })

export default UsuariosModel;