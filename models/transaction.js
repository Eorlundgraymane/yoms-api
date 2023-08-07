const sequelize = require("sequelize");
const database = require("../database/database");

const Transaction = database.define("transaction", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: sequelize.INTEGER,
    allowNull:false    
  },
});

module.exports = Transaction;