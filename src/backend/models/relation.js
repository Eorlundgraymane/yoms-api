const User = require("./user");
const Account = require("./account");
const Beneficiary = require("./beneficiary");
const Transaction = require("./transaction");

User.hasMany(Account);
User.hasMany(Beneficiary, { as: "beneficiaries" });
Account.belongsToMany(User, { through: Beneficiary , as:"beneficiaries"});
Account.belongsTo(User, { as: "user" });
Account.hasMany(Transaction, { as: "credit" });
Account.hasMany(Transaction, { as: "debit" });
Transaction.belongsTo(Account, { as: "creditor" });
Transaction.belongsTo(Account, { as: "debtor" });