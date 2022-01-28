const expressConfig = require('../config/expressConfig/index')
const db = require('../database/db')
const userTable = require('../database/tables/user')

const port = 3001
const app = expressConfig()


db.connect(erro => {
    if(erro){
        console.log(erro)
    }else{
        console.log("Database connected!")
        userTable.init(db)
        app.listen(port,() => console.log(`Port ${port} available!`))
    }
})


