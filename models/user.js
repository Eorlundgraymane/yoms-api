const sequelize = require("sequelize");
const database = require("../database/database");

const User = database.define("user", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  password: {
    type: sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: sequelize.BOOLEAN,
    defaultValue:true
  },
});

module.exports = User;