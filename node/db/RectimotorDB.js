import { Sequelize } from "sequelize";
const db = new Sequelize('dsotofuya_trabajodecampo_rectimotor', 'dsotofuya', 'robot2300', {
    host: 'mysql-dsotofuya.alwaysdata.net',
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