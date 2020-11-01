var express = require('express')
var cors = require('cors')
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 5000


app.use(cors())
app.use(
    bodyParser.urlencoded({extended: true
    }));
    app.use(bodyParser.json())

    
var Users = require("./routes/Users")
var UsersInfo = require("./routes/UsersInfo")
var UsersInfoRh = require("./routes/usersrhinfo")
var Questions = require("./routes/questionsRoute")

app.use('/users',Users)
app.use('/usersInfo',UsersInfo)
app.use('/rh',UsersInfoRh)
app.use('/qc',Questions)

app.listen(port,() =>{
    console.log("Server is running on port : "+ port)
})