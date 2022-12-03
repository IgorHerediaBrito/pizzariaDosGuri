const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const getConnection = () => {

    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    });

}

const execSQLQuery = async (sqlQry, res) => {
    return new Promise((resolve, reject) => {
        const conn = getConnection();   

        conn.connect((err) => {
            if (err) {
                reject(err);
            } else {
                conn.query(sqlQry, (
                    error, results, fields
                ) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    conn.end();
                }
                );
            }
        });
    });
}

module.exports.execSQLQuery = execSQLQuery;