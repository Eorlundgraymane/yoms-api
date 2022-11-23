const { Sequelize } = require("sequelize");

// const database = new Sequelize("yoms", "root", "password", {
//   dialect: "mysql",
//   host: "localhost",
// });

const database = new Sequelize(
  "zvr5vsjzyrwv48x7",
  "tkbh4nhxzlqlzsgm",
  "tpun81wjmbwb3agt",
  {
    dialect: "mysql",
    host: "	lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
  }
);

module.exports = database;
