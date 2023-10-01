const { Sequelize } = require("sequelize");
const database = require("./database");

const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

User.hasMany(Account);
Account.belongsTo(User, {as : "user"});
Account.hasMany(Transaction, { as: "credit" });
Account.hasMany(Transaction, { as: "debit"});
Transaction.belongsTo(Account, { as: "creditor" });
Transaction.belongsTo(Account, { as: "debtor" });