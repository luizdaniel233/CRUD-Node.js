const db = require('mysql2')

const conexao = db.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"luiz123",
    database:"callidus"
})

module.exports = conexao