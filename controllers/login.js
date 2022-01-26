const login = require('../models/login');
const { verifyJWT } = require('../models/validaData');
module.exports = app =>{

    app.post("/login",(req,res) => {

        const { email,password } = req.body;
        login.logon(email,password,res)
    })

    app.post("/logout/",(req,res) => {
        
        res.status(200).json({auth:false,token:null})
    })



}