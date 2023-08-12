const sequelize = require("sequelize");
const database = require("../database/database");

const Account = database.define("account", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: sequelize.INTEGER,
    defaultValue:0
  },
  isActive: {
    type: sequelize.BOOLEAN,
    defaultValue:true
  },
});

module.exports = Account;