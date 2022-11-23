//Technical Dependencies
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//Custom Dependencies
const globalLogger = require("./helpers/globalLogger");

//Database Configurations
const database = require("./database/database");
const relations = require("./database/relations");
const initializer = require("./database/initializer");

//Main Router
const mainRouter = require("./routers/mainRouter");

//PORT Configurations
const PORT = process.env.PORT || 3001;

//Parsing Request Body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Request Filter and Sanitizer
app.use((req, res, next) => {
  console.log(req.url);
  next();
});

//Main Router Set
app.use(mainRouter);

//Database Connector and App Loader
database.sync().then(
  (result) => {
    initializer
      .createAdmin()
      .then((admin) => {
        if (admin != null) {
           console.log("Admin Online!");
        }        
        console.log("DB Connected.");
        app.listen(PORT, () => {
          console.log("Yoms API Server is Online!");
        });
      })
      .catch((error) => {
        console.log("App Crashed!");
        console.log(error);
      });
  },
  (err) => {
    globalLogger.errorLog("DB Failed to Sync",err)
  }
);