let devOpsController = require('../src/controllers/devOpsController');

module.exports = {
    put: {
        dbReset: (req, res) => {            
            devOpsController.devOps.dbReset(msg => res.send(msg), err => res.send(err));
        }
    }
}