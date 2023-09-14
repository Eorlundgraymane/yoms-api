const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

module.exports.get = {
    account: {
        infoByID: async (req, res) => {
            let accountID = req.body.id;
            try {
                let account = await Account.findByPk(accountID);
                res.send(account);
            }
            catch (ex) {
                res.status(500).send(ex.message);
            }
        },
        byID: async (req, res) => {
            let accountID = req.body.id;
            try {
                let account = await Account.findByPk(accountID, { include: [{ model: Transaction, as: "debit" }, { model: Transaction, as: "credit" }] });
                res.send(account);
            }
            catch (ex) {
                res.status(500).send(ex.message);
            }
        }
    }
}

module.exports.put = {
    account: {
        openByUserID: async (req, res) => {
            let userID = req.body.userID;
            let accountName = req.body.accountName;
            try {
                let user = await User.findByPk(userID);
                if (user != null) {
                    try{
                        let account = await user.createAccount({ accountName: accountName });
                        console.log("Account Created!");
                        res.send(account);
                    }                    
                    catch(ex){
                        console.log(ex.message);
                        res.status(500).send(ex.message);
                    }
                }
                else {
                    res.status(500).send("User Not Found!");
                }
            }
            catch (ex) {
                console.log(ex);
                res.status(500).send(ex);
            }
        },
    },

}

module.exports.post = {
    account: {
        closeByID: async (req, res) => {
            let accountID = req.body.id;
            try {
                let account = await Account.findByPk(accountID);
                if(account.isActive){
                    account.isActive = false;
                    account = await account.save()
                    res.send(account);
                }                
                else{
                    res.status(500).send("Account is already Closed!");
                }
            }
            catch (ex) {
                res.status(500).send(ex);
            }
        }
    }
}
