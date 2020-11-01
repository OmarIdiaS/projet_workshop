const Sequelize = require("sequelize")
const db = require("../database/db.js")

module.exports = db.sequelize.define(
    'usersrh',
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey : true, 
            autoIncrement : true 
        },
        nom: {
            type: Sequelize.STRING
        },
        prenom:{
            type: Sequelize.STRING
        },
        
        password: {
            type: Sequelize.STRING
        }

    },
    {
    timestamps : false 
    }
    
)