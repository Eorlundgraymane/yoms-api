const modelController = require('../src/controllers/modelController');
let Account = require('../src/models/account');

module.exports = {
    get: {
        fetchByID: async (req, res) => {
            let accountID = req.body.accountID;
            modelController.fetch.byID(Account, accountID, account => res.send(account), err => res.status(404).send(err))
        }
    },
    post: {
        openAccount: (req, res) => {
            let userID = req.body.userID;
            let accountName = req.body.accountName;
            let balance = req.body.balance;
            let params = { userID: userID, accountName: accountName, balance: balance };
            modelController.create.byParams(Account, params, account => res.send(account), err => res.status(403).send(err));
        }
    }
}