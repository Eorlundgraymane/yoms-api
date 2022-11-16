//Creation, Fetching, Updating and Deleting User

const User = require("../models/user");

const gobalLogger = require("../helpers/globalLogger");

//createUser
exports.createUser = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.create({
    username: username,
    password: password,
  })
    .then((user) => {
      if (user != null) {
        console.log(user);
        res.status(200).send(user);
      } else {
        res
          .status(500)
          .send(gobalLogger.errorLog("Failed in User Creation", error));
      }
    })
    .catch((error) => {
      res
        .status(403)
        .send(gobalLogger.errorLog("Username Already Exists", error));
    });
};
