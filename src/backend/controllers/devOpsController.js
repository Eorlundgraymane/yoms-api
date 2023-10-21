const database = require('../database/database');
const relation = require('../models/relation');

module.exports = {
    devOps: {
        dbReset: async (success, error) => {
            try {
                await database.drop();
                await database.sync({ force: true });
                success('DB Reset Succesfully');                
            }
            catch (err) {
                console.log(err);
                error(err);
            }

        }
    }
}