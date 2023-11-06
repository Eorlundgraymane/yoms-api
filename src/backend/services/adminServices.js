const modelController = require('../controllers/modelController');
const User = require('../models/user');
const Account = require('../models/account');

const roles = { 1: 'user ', 2: 'admin' };

module.exports = {
    get: {
        userlist: async () => {
            let userlist = await modelController.findAll(User, {}, false, false);
            return userlist;
        },
        userinfo: async (userID) => {
            let user = await modelController.findByPk(User, userID, true, true);
            return user;
        },
        accountInfo: async (accountID) => {
            let account = await modelController.findByPk(Account, accountID, true, true);
            return account;
        }
    },
    post: {
        openAccount: async (userID, accountName, balance) => {
            let params = {};
            params.userID = userID;
            params.accountName = accountName;
            params.balance = balance;
            let account = await modelController.create(Account, params);
            return account;
        }
    },
    put: {
        /**
           * 
           * @param {Int16Array} userID 
           * @param {{1:'user',2:'admin'}} role 
           */
        role: async (userID, role) => {
            let user = await modelController.findByPk(User, userID, true);
            user.role = roles[role];
            await user.save();
            return user
        },
    }


}