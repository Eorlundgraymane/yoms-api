const modelController = require('../controllers/modelController');
const User = require('../models/user');
module.exports = {
    findByID: async (id, extended, nested = false) => {
        return await modelController.findByPk(User, id, extended, nested)
    },
    findByCreds: async (username, password, extended = false, nested = false) => {
        let where = {
            username: username,
            password: password
        }
        let params = {};
        params.where = where;
        //return await User.findOne({ where: { username: 'rkay', password: 'pass' }, include: { all: true } })
        let user = await modelController.findOne(User, params, extended, nested);
        console.log(user);
        return user;
    },
    createByCreds: async (username, password) => {
        let params = {
            username: username,
            password: password
        }
        return await modelController.create(User, params);
    },
    createBeneficiary: async (userID, accountID, nickname) => {
        let user = await modelController.findByPk(User, userID, true)
        let benefit = false;
        if (user.beneficiaries.length > 0) {
            user.beneficiaries.forEach(beneficiary => {
                if (beneficiary.accountID == accountID) {
                    benefit = true;
                }
            });
        }
        if (benefit)
            return 'Beneficiary already exists';
        try {
            let beneficiary = await user.createBeneficiary({ accountID: accountID, nickname: nickname });
            return beneficiary;
        }
        catch (err) {
            return err.stack
        }
    },
    deleteByID: async (id) => {
        let where = {};
        let params = {};
        where.ID = id;
        params.where = where;
        return await modelController.delete(User, params);
    }
}