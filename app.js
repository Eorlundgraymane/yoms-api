const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const database = require("./database/database");
const relation = require("./database/relation");
const masterRouter = require("./routers/masterRouter");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ extended: true }));

app.use(masterRouter);
const errorController = require("./controllers/errorController");
app.use(errorController.NotFound);

database.sync().then(() => {
    app.listen(PORT, (req, res) => {
        console.log("API is Online!");
    });
})