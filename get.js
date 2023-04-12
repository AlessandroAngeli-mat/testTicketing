'use strict'

const { connect } = require("http2");
const mysql = require("mysql2/promise")

module.exports.getAll = async (event) => {
    const connection = await mysql.createConnection({
        host: "af-aws-2023.cfiufdzabv63.us-east-1.rds.amazonaws.com",
        port: "3306",
        user: "admin",
        password: "password",
        database: "af-aws-2023"
    });

    try {
        const [rows, fields] = await connection.execute("select * from ticket");
        connection.end();

        return {
            statusCode: 200,
            body: JSON.stringify(rows),
            header: {
                "Content-type": "application/json",
            }
        }
    } catch(error) {
        connection.end();
        return {
            statusCode: 500,
            body: JSON.stringify(error.message),
            header: {
                "Content-type": "application/json",
            }
        }
    }
}