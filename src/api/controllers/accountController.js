const accountServices = require('../../backend/services/accountServices');

module.exports = {
    get: {
        findByID: async (req, res) => {
            let accountID = req.body.accountID;
            let extended = req.body.extended;
            let account = await accountServices.findByID(accountID, extended);
            if(account.ID == null)
                res.status(404);
            res.send(account);
        },
        findByUserID: async (req, res) => {
            let userID = req.body.userID;
            let extended = req.body.extended;
            let account = await accountServices.findByUserID(userID, extended);
            if(account.ID == null)
                res.status(404);
            res.send(account);
        }
    },
    post: {
        createByParams: async (req, res) => {
            let userID = req.body.userID;
            let accountName = req.body.accountName;
            let account = await accountServices.createByParams(userID,accountName);
            if(account.ID == null)
                res.status(403);
            res.send(account);
        },
        pay: async (req, res) => {
            let creditorID = req.body.creditorID;
            let debtorID = req.body.debtorID;
            let amount = req.body.amount;
            let transaction = await accountServices.createTransaction(creditorID, debtorID, amount);
            if(transaction.ID == null)
                res.status(403);
            res.send(transaction);
        }
    },
    put: {

    },
    delete: {

    },
}