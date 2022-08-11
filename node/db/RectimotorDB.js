import { Sequelize } from "sequelize";
import { config } from 'dotenv';
config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    define: {
        timestamps: false
    }
})

// var seq = new Sequelize('dsotofuya_trabajodecampo_rectimotor', 'dsotofuya', 'robot2300', {
//     host: 'mysql-dsotofuya.alwaysdata.net',
//     dialect: 'mysql'
// });
// seq.query('show tables').then(function (rows) {
//     console.log(JSON.stringify(rows));
// });

export default db;