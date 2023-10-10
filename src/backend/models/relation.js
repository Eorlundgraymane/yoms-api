const User = require("./user");
const Account = require("./account");
const Transaction = require("./transaction");

User.hasMany(Account);
Account.belongsTo(User, {as : "user"});
Account.hasMany(Transaction, { as: "credit" });
Account.hasMany(Transaction, { as: "debit"});
Transaction.belongsTo(Account, { as: "creditor" });
Transaction.belongsTo(Account, { as: "debtor" });