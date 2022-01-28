const controlUser = require('../models/controlUser')
const { verifyJWT } = require('../models/validaData');
module.exports = app =>{

    app.get('/users',verifyJWT,(req,res,next) => {
        controlUser.listUsers(res)
    })

    app.delete("/users/delete/:id",verifyJWT,(req,res) => {
        const id = req.params.id;
        controlUser.delete(id,res)
    })

    app.post('/signup', (req,res) => {
        const data = req.body;
        controlUser.createUser(data,res)
    })

}