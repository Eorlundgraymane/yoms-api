const modelController = require('../src/controllers/modelController');
let Transaction = require('../src/models/transaction');

module.exports = {
    get: {
        fetchByID: async (req, res) => {
            let transactionID = req.body.transactionID;
            modelController.fetch.byID(Transaction, transactionID, transaction => res.send(transaction), err => res.status(404).send(err))
        }
    },
    post: {
        pay: (req, res) => {
            let creditorID = req.body.creditorID;
            let debtorID = req.body.debtorID;
            let amount = req.body.amount;
            let params = { creditorID: creditorID, debtorID: debtorID, amount: amount };
            modelController.create.byParams(Transaction, params, transaction => res.send(transaction), err => res.status(403).send(err));
        }
    }
}