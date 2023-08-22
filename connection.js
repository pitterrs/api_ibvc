import mysql from "mysql";

export const connection = mysql.createPool({
    connectionLimit : 100,
    host: "localhost",
    user: "root",
    password: "root",
    port: 3306,
    database: "ibvc_data",
    multipleStatements: true,
    timezone: 'BRT'
})