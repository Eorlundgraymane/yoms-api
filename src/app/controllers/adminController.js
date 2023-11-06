const adminServices = require('../../backend/services/adminServices');

module.exports = {
    get: {
        authenticate: (req, res, next) => {
            if (req.session.isAdmin) {
                next();
            }
            else {
                res.redirect('/auth/login');
            }
        },
        adminConsole: async (req, res) => {
            let params = {};
            params.user = req.session.user;
            res.render('admin/index.ejs', params);
        },
        userlist: async (req, res) => {
            let users = await adminServices.get.userlist();
            let params = {};
            params.users = users;
            res.render('admin/partials/userlist.ejs', params);
        },
        userinfo: async (req, res) => {
            let userID = req.params[0];
            let user = await adminServices.get.userinfo(userID);
            let params = {};
            params.user = user;
            res.render('admin/partials/userinfo.ejs', params);
        },
        accountInfo: async (req, res) => {
            let accountID = req.params[0];
            let account = await adminServices.get.accountInfo(accountID);
            let params = {};
            if (account.ID == null) {
                res.status(404).send("Could not find account");
            }
            else {
                params.account = account;
                res.render("admin/partials/accountinfo.ejs",params);
            }
        },
        statement : async(req,res) => {
            let accountID = req.params[0];
            let account = await adminServices.get.accountInfo(accountID, true, true);
            let credits = account.credit;
            let debits = account.debit;
            let user = req.session.user;
            let transactions = [];
            transactions = await sorter.sortTransactions(accountID, credits, debits);
            console.log(transactions);
            let params = {};
            params.transactions = transactions;
            params.user = user;
            console.log(user.beneficiaries);
            res.render('accounts/partials/statement.ejs', params);
        }
    },
    post: {
        openAccount: async (req, res) => {
            let userID = req.body.userID;
            let accountName = req.body.accountName;
            let balance = req.body.balance;
            let account = await adminServices.post.openAccount(userID, accountName, balance);
            if (account.ID == null) {
                res.status(500).send("Failed to Open Account");
            }
            else {
                res.send(account);
            }
        }
    },
    put: {
        assignRole: async (req, res) => {
            let userID = req.body.userID;
            let role = req.body.role;
            let user = await adminServices.put.role(userID.role);
            return res.json({ success: true });
        }
    }
}