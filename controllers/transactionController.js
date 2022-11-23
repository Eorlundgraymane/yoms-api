//Creation, Fetching, Updating and Deleting Transactions
const Transaction = require("../models/transaction");
const Account = require("../models/account");
const { Op } = require("sequelize");

const globalLogger = require("../helpers/globalLogger");

exports.initTransaction = (req, res) => {
  let debtorId = req.body.debitorId;
  let creditorId = req.body.creditorId;
  let amount = parseFloat(req.body.amount);
  if (debtorId != creditorId) {
    Account.findByPk(debtorId)
      .then((debtAccount) => {
        if (debtAccount.balance >= amount) {
          Transaction.create({
            amount: amount,
            status: "Processing",
          })
            .then((transaction) => {
              debtAccount.balance -= amount;
              debtAccount
                .save()
                .then((debit) => {
                  debtAccount
                    .addDebits(transaction)
                    .then((result) => {
                      console.log("!!!Transaction Debited!!!");
                      console.log(result);
                      Account.findByPk(creditorId)
                        .then((creditAccount) => {
                          creditAccount.balance += amount;
                          creditAccount
                            .save()
                            .then((credit) => {
                              creditAccount
                                .addCredits(transaction)
                                .then((result) => {
                                  console.log("!!!Transaction Credited!!!");
                                  console.log(result);
                                  transaction.status = "Success";
                                  transaction
                                    .save()
                                    .then((transtn) => {
                                      res.status(200).send(transtn);
                                    })
                                    .catch((err) => {
                                      let errorMsg =
                                        "Failed to Update Transaction Status!";
                                      globalLogger.errorLog(errorMsg, err);
                                      res.status(500).send(errorMsg);
                                    });
                                })
                                .catch((err) => {
                                  let errorMsg =
                                    "Failed to Link Credit Transaction!";
                                  globalLogger.errorLog(errorMsg, err);
                                  res.status(500).send(errorMsg);
                                });
                            })
                            .catch((err) => {
                              let errorMsg = "Failed to Credit Account!";
                              globalLogger.errorLog(errorMsg, err);
                              res.status(500).send(errorMsg);
                            });
                        })
                        .catch((err) => {
                          let errorMsg = "Failed to Fetch Debtor Account!";
                          globalLogger.errorLog(errorMsg, err);
                          res.status(500).send(errorMsg);
                        });
                    })
                    .catch((err) => {
                      let errorMsg = "Failed to Link Debit Transaction!";
                      globalLogger.errorLog(errorMsg, err);
                      res.status(500).send(errorMsg);
                    });
                })
                .catch((err) => {
                  let errorMsg = "Failed to Debit Account!";
                  globalLogger.errorLog(errorMsg, err);
                  res.status(500).send(errorMsg);
                });
            })
            .catch((err) => {
              let errorMsg = "Failed to Create Transaction!";
              globalLogger.errorLog(errorMsg, err);
              res.status(500).send(errorMsg);
            });
        } else {
          res.status(403).send("Insufficient Balance in Account!");
        }
      })
      .catch((err) => {
        let errorMsg = "Failed to Fetch Debtor Account!";
        globalLogger.errorLog(errorMsg, err);
        res.status(500).send(errorMsg);
      });
  } else {
    res.status(403).send("Cannot Transfer to same Account!");
  }
};

exports.getTransactions = (req, res) => {
  let accountId = parseInt(req.body.accountId);

  Transaction.findAll({
    where: {
      [Op.or]: {
        creditorId: accountId,
        debtorId: accountId,
      },
    },
  })
    .then((transactions) => {
      res.status(200).send(transactions);
    })
    .catch((err) => {
      let errorMsg = "Cannot find any Transactions!";
      globalLogger.errorLog(errorMsg, err);
      res.status(403).send(errorMsg);
    });
};
