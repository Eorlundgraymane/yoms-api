const database = require('../database/database');
const relation = require('../models/relation');

module.exports = {
    DB: {
        reset: async () => {
            try {
                await database.drop();
                await database.sync({ force: true });                      
                return 'DB Reset Successful';
            }
            catch (err) {
                console.log(err);
                return (err);
            }

        }
    }
}