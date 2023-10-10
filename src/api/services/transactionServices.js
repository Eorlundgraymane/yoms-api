const modelController = require('../../backend/controllers/modelController');
let Account = require('../../backend/models/account');
let Transaction = require('../../backend/models/transaction');

module.exports = {
    get: {
        fetchByID: async (req, res) => {
            let transactionID = req.body.transactionID;
            modelController.fetch.byID(Transaction, transactionID, transaction => res.send(transaction), err => res.status(404).send(err))
        }
    },
    post: {
        pay: async (req, res) => {
            let creditorID = req.body.creditorID;
            let debtorID = req.body.debtorID;
            let amount = parseInt(req.body.amount);
            let params = { creditorID: creditorID, debtorID: debtorID, amount: amount };
            if (creditorID == null || debtorID == null || amount == null) {
                res.status(403).send("Please provide proper payment information");
            }
            else {
                let creditor = await Account.findByPk(creditorID);
                let debtor = await Account.findByPk(debtorID);
                if (creditor == null || debtor == null) {
                    res.status(403).send("Please provide proper payment information");
                }
                else if (debtor.balance >= amount) {
                    debtor.balance -= amount;
                    creditor.balance += amount;
                    await debtor.save();
                    await creditor.save();
                    modelController.create.byParams(Transaction, params, transaction => res.send(transaction), err => res.status(403).send(err));
                }
                else {
                    res.status(403).send("Insufficient Balance");
                }
            }


        }
    }
}