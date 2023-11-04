const express = require("express");
const session = require('express-session');
const app = express();
const path = require('path');

const bodyParser = require("body-parser");

const database = require("../backend/database/database");
const relation = require("../backend/models/relation");
const masterRouter = require("./routers/masterRouter");

const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', 'src/app/views');

app.use(session({
    secret: 'rkaysecret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 600000 }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

app.use('/scripts', express.static(path.join(__dirname, 'public', 'scripts')));
app.use('/styles', express.static(path.join(__dirname, 'public', 'styles')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use(masterRouter);

database.sync().then(() => {
    app.listen(PORT, (req, res) => {
        console.log("API is Online!");
    });
})