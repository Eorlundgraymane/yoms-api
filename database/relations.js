const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

User.hasMany(Account,{as:"Accounts"});

Transaction.belongsTo(Account, {
  as: "Debtor",
  foreignKey: "debtorId",
});
Transaction.belongsTo(Account, {
  as: "Creditor",
  foreignKey: "creditorId",
});
