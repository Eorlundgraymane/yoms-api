const { Sequelize } = require("sequelize");
const database = require("./database");

const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

User.hasMany(Account);
Account.belongsTo(User);
Account.hasMany(Transaction, { as: "Credit", foreignKey: "CreditorId" });
Account.hasMany(Transaction, { as: "Debit", foreignKey: "DebtorId" });
Transaction.belongsTo(Account, { as: "Creditor" });
Transaction.belongsTo(Account, { as: "Debtor" });