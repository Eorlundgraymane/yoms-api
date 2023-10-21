const modelController = require('../../backend/controllers/modelController');
let Account = require('../../backend/models/account');

module.exports = {
    get: {
        fetchByID: (req, res) => {
            let accountID = req.body.accountID;
            let extended = req.body.extended != null ? req.body.extended : false;
            modelController.fetch.findByPk(Account, accountID, extended, account => res.send(account), err => res.status(404).send(err))
        },
        fetchByUserID: (req, res) => {
            let userID = req.body.userID;
            let params = { where: { userID: userID } };
            let extended = req.body.extended != null ? req.body.extended : false;
            modelController.fetch.findAll(Account, params, extended, account => res.send(account), err => res.status(404).send(err))
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