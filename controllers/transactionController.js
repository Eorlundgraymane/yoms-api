const Transaction = require("../models/transaction");
const Account = require("../models/account");
const User = require("../models/user");

module.exports.get = {
    transaction: {
        byID: async (req, res) => {
            let transactionID = req.body.id;    
            try{
                let transaction = await Transaction.findByPk(transactionID, { include: [{ model: Account, as: "debtor", include: { model: User } }, { model: Account, as: "creditor", include: { model: User } }] });
                if (transaction == null) {
                    res.status(500).send("Transaction not Found");
                    return;
                }
                res.send(transaction);
                return
            }                    
            catch(ex){
                console.log(ex);
                res.status(500).send(ex.message)
                return;
            }
        },
        infoByID: async (req, res) => {
            let transactionID = req.body.id;

            let transaction = await Transaction.findByPk(transactionID);
            if (transaction == null) {
                res.status(500).send("Transaction not Found");
                return;
            }
            res.send(transaction);
            return;
        }
    }
}

module.exports.put = {
    transaction: {
        payByAccountIDs: async (req, res) => {
            let creditorID = req.body.creditorID;
            let debitorID = req.body.debitorID;
            let amount = parseInt(req.body.amount);

            if (amount > 0 && creditorID != debitorID) {
                let debitor = await Account.findByPk(debitorID);
                let creditor = await Account.findByPk(creditorID);
                if (creditor == null || !creditor.isActive) {
                    res.status(500).send("Creditor not Found or Active");
                    return;
                }
                if (debitor == null || !debitor.isActive) {
                    res.status(500).send("Debitor not Found or Active");
                    return;
                }
                if (debitor.balance >= amount) {
                    let transact = await debitor.createDebit({ creditorId: creditorID, amount: amount });
                    if (transact != null) {
                        debitor.balance -= amount;
                        creditor.balance += amount;
                        creditor = await creditor.save();
                        debitor = await debitor.save();
                        transact.status = true;
                        transact = await transact.save()
                        res.send(transact);
                    }
                }
                else {
                    res.status(500).send("Insufficient Balance");
                }
            }
            else {
                res.status(500).send("Transaction Details Invalid!");
            }
        },
        revertByID: async (req, res) => {
            let transactionID = req.body.id;
            let transaction = await Transaction.findByPk(transactionID);
            //SWAP CREDITOR AND DEBITOR FOR REVERT
            if(transaction == null){
                res.status(500).send("Transaction Not Found!");
                return;
            }
            let creditor = await Account.findByPk(transaction.debtorId);
            let debitor = await Account.findByPk(transaction.creditorId);
            let amount = parseInt(transaction.amount * -1);
            if (creditor == null || !creditor.isActive) {
                res.status(500).send("Creditor not Found or Active");
                return;
            }
            if (debitor == null || !debitor.isActive) {
                res.status(500).send("Debitor not Found or Active");
                return;
            }
            if (debitor.balance >= amount) {
                let transact = await debitor.createDebit({ creditorId: creditor.id, amount: amount });
                if (transact != null) {
                    debitor.balance -= amount;
                    creditor.balance += amount;
                    creditor = await creditor.save();
                    debitor = await debitor.save();
                    transact.status = true;
                    transact = await transact.save()
                    res.send(transact);
                }
            }
            else {
                res.status(500).send("Insufficient Balance to Revert");
            }
        }
    }
}