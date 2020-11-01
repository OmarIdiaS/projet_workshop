const Sequelize = require("sequelize")
const db = require("../database/dbUsers")

module.exports = db.sequelize.define(
    'users_info',
    {
        id: {
            type: Sequelize.INTEGER, 
            primaryKey : true, 
            autoIncrement : true 
        },
        varFacile: {
            type: Sequelize.INTEGER
        },
        varMoyen:{
            type: Sequelize.INTEGER
        },
        varDifficile:{
            type: Sequelize.INTEGER
        },
        temps: {
            type: Sequelize.INTEGER
        },
        idUser : {
            type : Sequelize.STRING
        },
        correct : {
            type: Sequelize.INTEGER
        },
        incorrect : {
            type : Sequelize.INTEGER
        },domaine:{
            type : Sequelize.STRING
        },
        varRetour:{
            type: Sequelize.INTEGER
        }

    },
    {
    timestamps : false 
    },{
        tableName : 'users_info'
    }
    
);