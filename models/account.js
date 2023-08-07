const sequelize = require("sequelize");
const database = require("../database/database");

const Account = database.define("account", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  balance: {
    type: sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: sequelize.BOOLEAN,
    defaultValue:true
  },
});

module.exports = Account;