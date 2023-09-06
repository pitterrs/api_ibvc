import mysql from "mysql";

export const connection = mysql.createPool({
    connectionLimit : 100,
    host: "177.11.48.200",
    user: "ibvc_pitter",
    password: "Oe,[$!S&5jYB",
    port: 3306,
    database: "ibvc_painel",
    multipleStatements: true,
    timezone: 'BRT'
})
// export const connection = mysql.createPool({
//     connectionLimit : 100,
//     host: "localhost",
//     user: "root",
//     password: "root",
//     port: 3306,
//     database: "ibvc_data",
//     multipleStatements: true,
//     timezone: 'BRT'
// })