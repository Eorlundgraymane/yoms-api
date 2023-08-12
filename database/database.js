const { Sequelize } = require("sequelize");

const dbConnectionString = process.env.JAWSDB_URL;
if (dbConnectionString != null) {
  const herokuSequelize = new Sequelize(dbConnectionString)
  herokuSequelize.authenticate().then((result) => {
    console.log("JAWSDB has been established successfully.");
  }).catch((error) => {
    console.error("Unable to connect to the JAWSDB database: ", error);
  });
  module.exports = herokuSequelize;
}
else {
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
}



