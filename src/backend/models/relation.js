const User = require("./user");
const Account = require("./account");
const Beneficiary = require("./beneficiary");
const Transaction = require("./transaction");

User.hasMany(Account);
User.hasMany(Beneficiary, { as: "beneficiaries" });
Account.belongsToMany(User, { through: Beneficiary, as: "beneficiaries" });
Account.belongsTo(User, { as: "user" });
Account.hasMany(Transaction, { as: "credit", foreignKey: "creditorID" });
Account.hasMany(Transaction, { as: "debit", foreignKey: "debtorID" });
Transaction.belongsTo(Account, { as: "creditor", foreignKey: "creditorID" });
Transaction.belongsTo(Account, { as: "debtor", foreignKey: "debtorID" });