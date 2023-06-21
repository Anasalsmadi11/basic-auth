'use strict';
require ('dotenv').config()
const {Sequelize, DataTypes}= require('sequelize')
const userSchema= require('./users-model')

// const POSTGRES_URI= process.env.NODE_ENV ==='test' ? "sqlite:memory" :process.env.DATABASE_URL;
const POSTGRES_URI= process.env.DATABASE_URL;
// let sequelizeOptions = process.env.NODE_ENV === "production" ?
//     {
//         dialectOptions: {
//             ssl: {
//                 require: true,
//                 rejectUnauthorized: false,
//             },
//         },
//     } :
//     {}

    let sequelize = new Sequelize(POSTGRES_URI, {});


    module.exports = {
        db: sequelize,
        userModel : userSchema(sequelize, DataTypes)
    }