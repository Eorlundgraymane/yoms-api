const database = require('../database/database');
const relation = require('../database/relation');

module.exports = {
    devOps: {
        dbReset: async (success, error) => {
            try {
                await database.sync({ force: true });
                success('DB Reset Succesfully');
            }
            catch (err) {
                error(err);
            }

        }
    }
}