const devOpsController = require('../../backend/controllers/devOpsController');

module.exports = {
    put: {
        dbReset: (req, res) => {
            devOpsController.devOps.dbReset(msg => { console.log(":TEST"); res.send(msg) }, err =>{console.log("ERROR"); res.send(err)});
        }
    }
}