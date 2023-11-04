const modelController = require('../controllers/modelController');
const Account = require('../models/account');
module.exports = {
    findByID: async (id, extended = false, nested = false) => {
        return await modelController.findByPk(Account, id, extended, nested)
    },
    findByUserID: async (userID, extended = false, nested = false) => {
        let where = {
            userID: userID
        }
        let params = {};
        params.where = where;
        return await modelController.findAll(Account, params, extended, nested);
    },
    createByParams: async (userID, accountName) => {
        let params = {
            userID: userID,
            accountName: accountName
        }
        return await modelController.create(Account, params);
    },
    updateBalanceByID: async (id, balance) => {
        let values = {};
        let options = {};
        let where = {};
        values.balance = balance;
        where.ID = id;
        options.where = where;
        return await modelController.update(Account, values, options);
    },
    createTransaction: async (creditorID, debtorID, amount) => {
        let creditor = await modelController.findByPk(Account, creditorID, false)
        let debtor = await modelController.findByPk(Account, debtorID, false)
        if (creditor == null || debtor == null) {
            return new Error('Sender or Recipient Account does not exist');
        }
        try {
            if (debtor.balance >= amount) {
                let newTransaction = await debtor.createDebit({ debtorID: debtorID, creditorID: creditorID, amount: amount });
                creditor.balance += amount;
                creditor = await creditor.save();
                debtor.balance -= amount;
                debtor = await debtor.save();
                newTransaction.status = true;
                newTransaction = await newTransaction.save();
                console.log(newTransaction);
                return newTransaction;
            }
            else {
                return false;
            }

        }
        catch (err) {
            return err.stack;
        }
    },
    deleteByID: async (id) => {
        let where = {};
        let params = {};
        where.ID = id;
        params.where = where;
        return await modelController.delete(Account, params);
    }
}
