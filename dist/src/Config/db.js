"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: false,
});
const testDbConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(DB_HOST, DB_NAME, DB_PASS);
    try {
        yield sequelize.authenticate();
        yield sequelize.sync({ force: false, alter: false });
        console.log('✅ Connection has been established successfully.');
    }
    catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
});
module.exports = { sq: sequelize, testDbConnection };
