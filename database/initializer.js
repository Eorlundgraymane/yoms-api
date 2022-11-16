//Creation, Fetching, Updating and Deleting User

const User = require("../models/user");

const gobalLogger = require("../helpers/globalLogger");

exports.createAdmin = () => {
  let username = "Admin";
  let password = "AdminPassword@235";

  return User.findByPk(1)
    .then((admin) => {
      if (admin != null) {
        return admin;
      } else {
        return User.create({
          id: 1,
          username: username,
          password: password,
        })
          .then((user) => {
            if (user != null) {
              console.log(user);
              return user;
            } else {
              gobalLogger.errorLog("Failed in Admin Creation", error);
            }
          })
          .catch((error) => {
            gobalLogger.errorLog("Admin already Exists!", error);
          });
      }
    })
    .catch((error) => {
      gobalLogger.errorLog("Failed in Finding Admin", error);
    });
};
