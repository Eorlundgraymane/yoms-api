const adminServices = require('../../backend/services/adminServices');

module.exports = {
    get: {
        findByID: async (req, res) => {
            let userID = req.body.userID;
            let extended = req.body.extended;
            let nested = req.body.nested;
            let user = await userServices.findByID(userID, extended, nested);
            if (user == null || user.ID == null)
                res.status(404);
            res.send(user);
        },
        findByCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let extended = req.body.extended;
            let nested = req.body.nested;
            let user = await userServices.findByCreds(username, password, extended, nested);
            if (user.ID == null)
                res.status(404);
            res.send(user);
        }
    },
    post: {
        createByCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let user = await userServices.createByCreds(username, password);
            if (user.ID == null)
                res.status(403);
            res.send(user);
        },
        addBeneficiary: async (req, res) => {
            let userID = req.body.userID;
            let accountID = req.body.accountID;
            let nickname = req.body.nickname;
            let beneficiary = await userServices.createBeneficiary(userID, accountID, nickname);
            if (beneficiary.userID == null)
                res.status(403);
            res.send(beneficiary);
        }
    },
    put: {
        
    },
    delete: {

    },
}