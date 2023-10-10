const modelController = require('../../backend/controllers/modelController');
let Account = require('../../backend/models/account');

module.exports = {
    get: {
        fetchByID: async (req, res) => {
            let accountID = req.body.accountID;
            modelController.fetch.byID(Account, accountID, account => res.send(account), err => res.status(404).send(err))
        },
        fetchByUserID: async (req, res) => {
            let userID =  req.body.userID;            
            let params = { where: { userID: userID } };
            modelController.fetch.byParams(Account, params, account => res.send(account), err => res.status(404).send(err))
        },
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