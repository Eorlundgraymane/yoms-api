const modelController = require('../../backend/controllers/modelController');
let User = require('../../backend/models/user');

module.exports = {
    get: {
        fetchByID: (req, res) => {
            let userID = req.body.userID;
            let extended = req.body.extended != null ? req.body.extended : false;
            modelController.fetch.findByPk(User, userID, extended, user => res.send(user), err => res.status(404).send(err))
        },
    },
    post: {
        fetchByCreds: (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let extended = req.body.extended != null ? req.body.extended : false;
            let params = {};
            let where = {};
            where.username = username;
            where.password = password;
            params.where = where;
            console.log(params);
            modelController.fetch.findOne(User, params, extended, user => res.send(user), err => res.status(404).send(err));                        
        },
        createByCreds: (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let params = { username: username, password: password };
            modelController.create.byParams(User, params, user => res.send(user), err => res.status(403).send(err));
        },
        addBeneficiary: (req, res) => {
            let userID = req.body.userID;
            let accountID = req.body.accountID;
            modelController.fetch.findByPk(User, userID, true, async user => {
                console.log(user);                
                let account = user.accounts.find(account => account.ID == accountID);
                if (account == null) {
                    try {
                        let beneficiary = await user.createBeneficiary({ accountID: accountID });
                        res.send(beneficiary);
                    }
                    catch (err) {
                        console.log(err);
                        res.status(403).send(err);
                    }
                }
                else {
                    res.status(403).send("Cannot add own account as Beneficiary");
                }
            }, err => res.status(403).send(err));
        }
    }
}