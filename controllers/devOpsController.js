const express = require("express");
const app = express();

const database = require("../database/database");
const relation = require("../database/relation");

module.exports.dbreset = async(req,res) => {
    await database.sync({force:true});
    res.send("DB Reset Successfully");
}