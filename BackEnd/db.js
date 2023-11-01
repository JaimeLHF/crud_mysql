import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "jaime0hansen",
    database: "crud"
});