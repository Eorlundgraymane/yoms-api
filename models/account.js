const Sequelize = require("sequelize");
const database = require("../database/database");

const Account = database.define("account", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  balance: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "OPEN",
  },
  nickname: {
    type: Sequelize.STRING,
    defaultValue: "ACCOUNT",
  },
});

module.exports = Account;
