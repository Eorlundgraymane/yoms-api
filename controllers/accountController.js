//Creation, Fetching, Updating and Deleting Accounts
const Account = require("../models/account");

const globalLogger = require("../helpers/globalLogger");

exports.deleteAccount = (req, res) => {
  let accountId = req.body.accountId;
  Account.destroy({ where: { id: accountId } })
    .then((result) => {
      console.log(result);
      if (result == 0) {
        res.status(403).send(globalLogger.errorLog("Account Does Not Exist"));
      } else {
        res.status(200).json("Account Deleted!");
      }
    })
    .catch((error) => {
      res
        .status(403)
        .send(globalLogger.errorLog("Account Does Not Exist", error));
    });
};

exports.updateAccount = (req, res) => {
  let accountID = req.body.accountId;
  let amount = parseFloat(req.body.amount);

  Account.findByPk(accountID)
    .then((account) => {
      account.balance += amount;
      account
        .save()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          globalLogger.errorLog("Failed to Update Account!", err);
        });
    })
    .catch((err) => {
      globalLogger.errorLog("User does not Exist!", err);
    });
};
