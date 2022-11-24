const { Sequelize } = require("sequelize");

// const database = new Sequelize("yoms", "root", "password", {
//   dialect: "mysql",
//   host: "localhost",
// });

const database = new Sequelize(
  "tpun81wjmbwb3agt",
  "zvr5vsjzyrwv48x7",
  "tkbh4nhxzlqlzsgm",
  {
    dialect: "mysql",
    host: "lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
  }
);

module.exports = database;
