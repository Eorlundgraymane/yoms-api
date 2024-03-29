const modelController = require('../controllers/modelController');
const Transaction = require('../models/transaction');
module.exports = {
    findByID: async (id, extended = false, nested = false) => {
        return await modelController.findByPk(Transaction, id, extended, nested)
    },
    findByIDs: async (ids, extended = false, nested = false) => {
        let params = {};
        let where = {};
        where.ID = ids;
        params.where = where;
        return await modelController.findAll(Transaction, params, extended, nested)
    },
    createByParams: async (creditorID, debitorID, amount) => {
        let params = {
            creditorID: creditorID,
            debitorID: debitorID,
            amount: amount
        }
        return await modelController.create(Transaction, params);
    },
    deleteByID: async (id) => {
        let where = {};
        let params = {};
        where.ID = id;
        params.where = where;
        return await modelController.delete(Transaction, params);
    }
}