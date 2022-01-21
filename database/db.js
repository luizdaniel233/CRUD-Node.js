const db = require('mysql2')

const conexao = db.createConnection({
    host:"host",
    port:0000,
    user:"user",
    password:"password",
    database:"database"
})

module.exports = conexao