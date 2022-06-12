import { Sequelize } from "sequelize";
const db = new Sequelize('dsotofuya_trabajodecampo_rectimotor', 'dsotofuya', 'robot2300', {
    host: 'mysql-dsotofuya.alwaysdata.net',
    dialect: 'mysql'
})

export default db;