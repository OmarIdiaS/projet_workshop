const express = require("express")

const users = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const User = require("../models/questions")
var bodyParser = require("body-parser")
users.use(cors())
process.env.SECRET_KEY = 'secret'



users.post('/saisirquestions',(req,res) =>{
    console.log("*****************"+JSON.stringify(req.body));
    
    const userData = {
        question: req.body.question,
        rep1 : req.body.rep1, 
        rep2 : req.body.rep2, 
        rep3 : req.body.rep3,
        numCorrect: req.body.numCorrect
    }

    
                User.create(userData)
})
module.exports = users 

users.get("/questionsDemande", (req, res) =>
    User.findAll().then( (result) => res.json(result) )
  );

  module.exports = users