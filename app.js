const express = require("express");
const app = express();

const database = require("./database/database");
const relation = require("./database/relation");


database.sync({force:true}).then(() => {
    app.listen(3000,(req,res) => {
        console.log("API is Online!");
    });
})