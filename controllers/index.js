const login = require('../models/login')
const controlUser = require('../models/controlUser')
const system = require('../models/create');
const { verifyJWT } = require('../models/validaData');
module.exports = app =>{

    app.post("/login",async (req,res) => {
        const { email,password } = req.body;
        login.logon(email,password,res)
    })

    app.post('/signup',async (req,res) => {
        const data = req.body;
        system.createUser(data,res)
    })

    app.post("/logout",(req,res) => {
        res.status(200).json({auth:false,token:null})
    })

    app.get('/users',verifyJWT,(req,res,next) => {
        controlUser.listUsers(res)
    })

    app.delete("/users/delete/:id",verifyJWT,(req,res) => {
        const id = req.params.id;
        controlUser.delete(id,res)
    })

}