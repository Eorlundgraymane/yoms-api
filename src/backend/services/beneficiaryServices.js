const modelController = require('../controllers/modelController');
const Beneficiary = require('../models/beneficiary');
module.exports = {
    findByID: async (id, extended = false, nested = false) => {
        return await modelController.findByPk(Beneficiary, id, extended, nested)
    },
    findByUserID: async (userID, extended = false, nested = false) => {
        let where = {
            userID: userID
        }
        let params = {};
        params.where = where;
        return await modelController.findAll(Beneficiary, params, extended, nested);
    },
    createByParams: async (userID, accountID, nickname) => {
        let params = {
            userID: userID,
            accountID: accountID,
            nickname: nickname
        }
        return await modelController.create(Beneficiary, params);
    },
    deleteByID: async (id) => {
        let where = {};
        let params = {};
        where.ID = id;
        params.where = where;
        return await modelController.delete(Beneficiary, params);
    }
}