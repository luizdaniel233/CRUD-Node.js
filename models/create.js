const db = require('../database/db')
const bcrypt = require('bcrypt')
const validaData = require('../models/validaData')

class Create{

    async createUser(data,res){
        
        const dadosUser = data
        const senha = dadosUser.password
        var  sql = `SELECT * FROM User WHERE email = '${dadosUser.email}'`

        db.query(sql,async (erro,resultado) => {
            if(erro){
                console.log(erro)
            }else{

                if(resultado.length == 0){
                    //password  Hash
                    let npassword = await Create.gerarSenhaHash(dadosUser.password);
                    let nconfirmpassword = await Create.gerarSenhaHash(dadosUser.confirmpassword);
                    
                    
                    if ((dadosUser.password === dadosUser.confirmpassword) && (validaData.validaSenha(senha))){
                        
                        sql =  'INSERT INTO user SET ?'
                        dadosUser.password = npassword
                        dadosUser.confirmpassword = nconfirmpassword
                        db.query(sql,dadosUser,(erro,resultado) => {
                            
                            if(erro){
                                console.log(erro)
                                res.status(422).json(erro)
                            }else{
                                console.log(dadosUser)
                                res.status(201).json(resultado)
                            }
                        })

                    }else{
                        console.log("Password and Confirm password isn't equals,or length isn't 8")
                        res.status(422).json({message:"Password and Confirm password isn't equals,or length isn't 8"})
                    }
                }else{
                    console.log("User already exists!")
                    res.status(200).json({erro:"User already exists!"})
                }
            }
        })
    }

    static gerarSenhaHash(data){
        const custoHash = 12
    
        return bcrypt.hash(data,custoHash)
    }
}

module.exports = new Create 