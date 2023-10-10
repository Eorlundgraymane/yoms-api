const sequelize = require("sequelize");
const database = require("../database/database");

const User = database.define("user", {
  ID: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: sequelize.BOOLEAN,
    defaultValue: true
  },
});

module.exports = User;