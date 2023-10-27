const modelController = require('../controllers/modelController');
const Beneficiary = require('../models/beneficiary');
module.exports = {
    findByID: async (id, extended = false) => {
        return await modelController.findByPk(Beneficiary, id, extended)
    },
    findByUserID: async (userID, extended = false) => {
        let where = {
            userID: userID
        }
        let params = {};
        params.where = where;
        return await modelController.findAll(Beneficiary, params, extended);
    },
    createByParams: async (userID, accountID) => {
        let params = {
            userID: userID,
            accountID: accountID
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