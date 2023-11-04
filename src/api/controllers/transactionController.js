const transactionServices = require('../../backend/services/transactionServices');

module.exports = {
    get: {
        findByID: async (req, res) => {
            let accountID = req.body.transactionID;
            let extended = req.body.extended;
            let nested = req.body.nested;
            let account = await transactionServices.findByID(accountID, extended, nested);
            if (account.ID == null)
                res.status(404);
            res.send(account);
        }
    },
    put: {

    },
    delete: {

    },
}