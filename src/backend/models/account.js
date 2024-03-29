const sequelize = require("sequelize");
const database = require("../database/database");

const Account = database.define("account", {
  ID: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  accountName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: sequelize.INTEGER,
    defaultValue: 1000,
  },
  isActive: {
    type: sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Account;