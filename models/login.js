const db = require('../database/db')
const bcrypt = require('bcrypt')
const validador = require('../models/validaData')
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

class Login {

    logon(email,senha,res){
        let result = []
        let value = true
        let senhaDB = ''
        
        const sql = `SELECT * FROM User WHERE email = '${email}'`
        db.query(sql,(erro,resultado) => {
            if(erro){
                console.log(erro)
            }else{
                if(resultado.length == 0){
                    console.log("Email not found!")
                }else{
                    for(let i = 0;i < resultado.length;i++){
                        //console.log('r:',resultado[i])
                        senhaDB = resultado[i].password
                        value = bcrypt.compareSync(senha, senhaDB)
                        if(value){
                            result = resultado[i]
                            break
                        }
                    }
                    
                    //token
                    const id = result.id
                    const token = jwt.sign({id},process.env.SECRET,{
                        expiresIn: 300 //FIVE MINUTES
                    })
                    console.log(token)
                    return res.status(200).json({auth:true,token:token})
                }
            }
        })
            
        
    }
       

}

module.exports = new Login