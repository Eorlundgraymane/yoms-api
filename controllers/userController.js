//Creation, Fetching, Updating and Deleting User

const User = require("../models/user");

const globalLogger = require("../helpers/globalLogger");

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
          .send(globalLogger.errorLog("Failed in User Creation", error));
      }
    })
    .catch((error) => {
      res
        .status(403)
        .send(globalLogger.errorLog("Username Already Exists", error));
    });
};
exports.getUser = (req, res) => {
  let username = req.body.username;

  User.findOne({
    where: { username: username },
    include: { association: "Accounts", include: [ "Credits","Debits"],  },
  })
    .then((user) => {
      if (user == null) {
        res.status(403).json(globalLogger.errorLog("User Does not Exist!"));
      } else {
        res.status(200).send(user);
      }
    })
    .catch((error) => {
      res.status(500).json(globalLogger.errorLog("Cannot Fetch User", error));
    });
};

exports.deleteUser = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({
    where: {
      username: username,
      password: password,
    },
  })
    .then((user) => {
      console.log(user);
      user
        .destroy()
        .then((user) => {
          res.status(200).send(user);
        })
        .catch((error) => {
          res
            .status(500)
            .send(globalLogger.errorLog("Failed in User Deletion", error));
        });
    })
    .catch((error) => {
      res.status(403).send(globalLogger.errorLog("User Does Not Exist", error));
    });
};
exports.openAccount = (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  User.findOne({
    where: {
      username: username,
      password: password,
    },
    include: "Accounts",
  })
    .then((user) => {
      user
        .createAccount()
        .then((account) => {
          User.findOne({
            where: {
              username: username,
              password: password,
            },
            include: "Accounts",
          })
            .then((newuser) => {
              res.status(200).send(newuser);
            })
            .catch((error) => {
              res
                .status(500)
                .send(globalLogger.errorLog("Failed to Fetch User", err));
            });
        })
        .catch((err) => {
          res
            .status(500)
            .send(globalLogger.errorLog("Failed to Open Account", err));
        });
    })
    .catch((error) => {
      res.status(403).send(globalLogger.errorLog("User Does Not Exist", error));
    });
};
exports.closeAccount = (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let password = req.body.password;
  let accountId = parseInt(req.body.accountId);

  User.findOne({
    where: {
      username: username,
      password: password,
    },
    include: "Accounts",
  })
    .then((user) => {
      user
        .getAccounts({ where: { id: accountId } })
        .then((accounts) => {
          if (accounts.length > 0) {
            user
              .removeAccount(accounts[0])
              .then((result) => {
                User.findOne({
                  where: {
                    username: username,
                    password: password,
                  },
                  include: "Accounts",
                })
                  .then((newuser) => {
                    res
                      .status(200)
                      .json({ message: "Closed Account!", newuser });
                  })
                  .catch((err) => {
                    res
                      .status(500)
                      .send(globalLogger.errorLog("Failed to Fetch User", err));
                  });
              })
              .catch((err) => {
                res
                  .status(500)
                  .send(globalLogger.errorLog("Failed to Close Account", err));
              });
          } else {
            res
              .status(403)
              .send(globalLogger.errorLog("Account does not Exist"));
          }
        })
        .catch((error) => {
          res
            .status(403)
            .send(globalLogger.errorLog("Account does not Exist", error));
        });
    })
    .catch((error) => {
      res
        .status(500)
        .send(globalLogger.errorLog("Failed to Close Account", error));
    })

    .catch((error) => {
      res.status(403).send(globalLogger.errorLog("User Does Not Exist", error));
    });
};
