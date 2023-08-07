const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("yoms-api", "root", "password", {
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then((result) => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

module.exports = sequelize;
