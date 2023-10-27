const modelController = require('../controllers/modelController');
const Account = require('../models/account');
module.exports = {
    findByID: async (id, extended = false) => {
        return await modelController.findByPk(Account, id, extended)
    },
    findByUserID: async (userID, extended = false) => {
        let where = {
            userID: userID
        }
        let params = {};
        params.where = where;
        return await modelController.findOne(Account, params, extended);
    },
    createByParams: async (userID,accountName) => {
        let params = {
            userID: userID,
            accountName : accountName
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
        try {
            if(debtor.balance >= amount){
                let newTransaction = await debtor.createDebit({ creditorID: creditorID, amount: amount });
                creditor.balance += amount;
                creditor = await creditor.save();
                debtor.balance -= amount;
                debtor = await debtor.save();
                newTransaction.status = true;
                newTransaction = await newTransaction.save();
                return newTransaction;
            }
            else{
                return Error('Insufficient Balance').message;
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
