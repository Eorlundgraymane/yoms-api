const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

module.exports.get = {
    account: {
        getByID: async (req, res) => {
            let accountID = req.body.id;
            try {
                let account = await Account.findByPk(accountID);
                res.send(account);
            }
            catch (ex) {
                res.send(ex);
            }
        }
    }
}

module.exports.put = {
    
}

module.exports.post = {
    account: {
        closeByID: async (req, res) => {
            let accountID = req.body.accountID;
            try {
                let account = await Account.findByPk(accountID);
                account.isActive = false;
                account = await account.save()
                res.send(account);
            }
            catch (ex) {
                res.status(500).send(ex);
            }
        }
    }
}
