const jwt = require('jsonwebtoken');
class validaData {

    validaSenha(senha){
        let result = true
        if((senha.length > 7) && (senha.length < 64)){
            result = true
            return result
        }else{
            if(senha.length < 8){
                result = false
                return result
            }
        }
    }

    verifyJWT(req, res, next){

        //console.log(req)
        const token = req.headers['authorization'];
        if (!token) {
            console.log("Without token")
            return res.status(401).json({ auth: false, message: 'No token provided.' });
        }
        jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err){
            console.log("Token Invalid")
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        } 
        
        // se tudo estiver ok, salva no request para uso posterior
        req.userId = decoded.id;
        next();
        });
    }

}

module.exports = new validaData