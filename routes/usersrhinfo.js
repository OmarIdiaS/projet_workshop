const express = require("express")

const informations_utilisateurs = express.Router()
const cors = require('cors')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')

const User = require("../models/rhinfo")
var bodyParser = require("body-parser")



informations_utilisateurs.post('/registerRh',(req,res) =>{
    console.log("*****************"+JSON.stringify(req.body));
    
    const userData = {
        nom : req.body.nom,
        prenom : req.body.prenom, 
        password : req.body.password
    }

    User.findOne({
        where:{
            nom : req.body.nom
        }
    })
    .then(user =>{
        if(!user){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                userData.password = hash 
                User.create(userData)
                .then(user =>{
                    res.json({status: user.id + 'registred'})
                })
                .catch(err => {
                    res.send("error :" + err)
                })
            })
        }
        else{
            res.json({error: "utilisateur existe déjà "})
        }
    })
    .catch(err => {
        res.send('error : ' +err )
    })
})

module.exports = informations_utilisateurs

informations_utilisateurs.post('/login',(req,res) =>{
    User.findOne({
        where:{
            nom : req.body.nom
        }
    })
    .then(user =>{
        if(user){
            if(bcrypt.compareSync(req.body.password, user.password)){
                console.log("********"+req.body.nom);
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY,{
                    expiresIn: 1440
                })
                res.send(token)
            }
        }else{
            res.status(400).json({error : 'Utilisateur n existe pas'})
        }
    })
    .catch(err =>{
        res.status(400).json({error : err})
    })
})

module.exports = informations_utilisateurs