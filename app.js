const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("sequelize");
const ejs = require("ejs");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use("/", (req, res, next) => {
    res.status(200).send("Yoms API Server is Online!")
})

app.listen(PORT, () => {
  console.log("Yoms API Server is Online!");
});
