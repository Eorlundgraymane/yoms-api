const devOpsServices = require('../../backend/services/devOpsServices');

module.exports = {
    DB: {
        reset: async (req, res) => {
            let dbReset = await devOpsServices.get.dbReset();
            res.send(dbReset);
        }
    }
}