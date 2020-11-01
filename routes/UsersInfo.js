const express = require("express")

const informations_utilisateurs = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const User = require("../models/UserInfo")
var bodyParser = require("body-parser")




informations_utilisateurs.post('/info',(req,res) =>{
    console.log("donnes :: "+JSON.stringify(req.body));
    
    const userInfoData = {
        varFacile : req.body.varFacile,
        varMoyen : req.body.varMoyen, 
        varDifficile : req.body.varDifficile, 
        idUser : req.body.idUser,
        temps : req.body.temps,
        correct : req.body.correct,
        incorrect : req.body.incorrect,
        domaine : req.body.domaine,
        varRetour: req.body.varRetour
    }

    User.create(userInfoData)
    .then(user => {res.json({status : user.varFacile + 'registred'})
    
    
    })
    .catch(err => {
        res.send('error : ' +err )
    })
})


module.exports = informations_utilisateurs

informations_utilisateurs.get("/listinfo", (req, res) =>
    User.findAll().then( (result) => res.json(result) )
  );

  module.exports = informations_utilisateurs
