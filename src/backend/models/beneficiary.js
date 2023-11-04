const sequelize = require("sequelize");
const database = require("../database/database");

const Beneficiary = database.define("beneficiary", {
  ID: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nickname: {
    type: sequelize.STRING,
    allowNull: false
  }
});

module.exports = Beneficiary;