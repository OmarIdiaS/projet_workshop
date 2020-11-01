const Sequelize = require("sequelize")
const db = require("../database/dbUsers.js")

module.exports = db.sequelize.define(
    'questions_rh',
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey : true, 
            autoIncrement : true 
        },
        question: {
            type: Sequelize.STRING
        },
        rep1:{
            type: Sequelize.STRING
        },
        
        rep2: {
            type: Sequelize.STRING
        },
        rep3:{
            type: Sequelize.STRING
        },
        numCorrect:{
            type:Sequelize.INTEGER
        }

    },
    {
    timestamps : false 
    }
    
)