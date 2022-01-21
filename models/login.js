const db = require('../database/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require("dotenv-safe").config();

class Login {

    logon(email,senha,res){
        let result = []
        let value = true
        let senhaDB = ''
        try{
            const sql = `SELECT * FROM User WHERE email = '${email}'`
                db.query(sql,(erro,resultado) => {
                    if(erro){
                        console.log(erro)
                    }else{
                        if(resultado.length == 0){
                            res.status(404).json({message:"Email does not found in the database!"})
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
                            if(result.length == 0){
                                res.status(400).json({message:"Invalid Password!"})
                            }else{
                                //token
                                const id = result.id
                                const token = jwt.sign({id},process.env.SECRET,{
                                    expiresIn: 300 //FIVE MINUTES
                                })
                                
                                res.status(200).json({auth:true,token:token})
                            
                            }
                        }
                        
                    }
                })
            
        }catch(erro){
            res.status(422).json(erro)
        }
    }
       

}

module.exports = new Login