const db = require('../database/db')

class controlUser{

    listUsers(res){

        const sql = 'SELECT * FROM User'

        db.query(sql,(erro,resultado) => {
            if(erro){
                console.log(erro)
                res.status(404).json(erro)
            }else{
                console.log(resultado)
                res.status(200).json(resultado)
            }
        })

    }

    delete(id,res){

        const sql = `DELETE FROM User WHERE id = ${id}`

        db.query(sql,(erro,resultado) => {
            if(erro){
                console.log(erro)
            }else{
               console.log(resultado)
               res.send("Deleted")
            }

        })

    }

}

module.exports = new controlUser