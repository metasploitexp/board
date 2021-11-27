const config = require('config')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'my_db',
    password: config.get('dbPassword')
    })
    
    module.exports.query = (sql, params) => {
        return new Promise((resolve) => {
            connection.query(sql, params, function(err, results) {
                resolve(results);
            })
        })
    }
    