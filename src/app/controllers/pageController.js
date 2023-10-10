const axios = require('axios').default;
const accountServices = require('../../api/services/accountServices');

module.exports = {
    get: {
        landingPage: (req, res) => {
            console.log("LANDING");
            let params = {};
            if (req.session != null && req.session.loggedIn != null && req.session.loggedIn) {
                console.log("AUTHED");
                params.user = req.session.user;
                params.userMessage = '';
                res.render('app', params);
            }
            else {
                console.log("NOT AUTHED");
                params.userMessage = '';
                res.render('auth',params);
            }
        },
        dashboard: (req, res) => {
            console.log("DASHBOARD");
            let params = {};
            if (req.session != null && req.session.loggedIn !== null && req.session.loggedIn) {
                params.user = req.session.user;
                res.render('dashboard', params);
            }
            else {                
                res.redirect('/');
            }

        },
        accountsPage: (req, res) => {
            console.log("ACCOUNTS");
            let params = {};
            if (req.session != null && req.session.loggedIn !== null && req.session.loggedIn) {
                params.accounts = [];
                let jsonData = {
                    userID: req.session.user.ID
                }
                let url = 'http://localhost:3000/api/account/fetchByUserID';
                axios.post(url, jsonData).then(result => {
                    if (result != null && result.data != null) {
                        params.user = req.session.user;
                        params.accounts = result.data;
                    }
                    res.render('accounts', params);
                }).catch(err => {
                    console.log(err);
                    res.send(err);
                });
            }
            else {                
                res.redirect('/');
            }
        },
        accountPage: (req, res) => {
            console.log("ACCOUNT");
            let params = {};
            if (req.session != null && req.session.loggedIn !== null && req.session.loggedIn) {
                params.accounts = [];
                console.log(req.body)
                let jsonData = {
                    accountID: req.body.accountID,
                }
                let url = 'http://localhost:3000/api/account/fetchByID';
                axios.post(url, jsonData).then(result => {
                    if (result != null && result.data != null) {
                        params.user = req.session.user;
                        params.account = result.data;
                    }
                    res.render('accounts/account.ejs', params);
                }).catch(err => {
                    res.status(err.response.status).send(err.response.data);
                });
            }
            else {
                res.redirect('/');
            }
        },
        pay: (req, res) => {
            let params = {};
            if (req.session != null && req.session.loggedIn !== null && req.session.loggedIn) {
                params.accounts = [];
                let jsonData = {
                    debtorID: req.body.debtorID,
                    creditorID: req.body.creditorID,
                    amount: req.body.amount,
                }
                let url = 'http://localhost:3000/api/transaction/pay';
                axios.post(url, jsonData).then(result => {
                    if (result != null && result.data != null) {
                        res.send("Payment Successful");
                    }
                    else {
                        res.status(403).send("Payment Failed");
                    }
                }).catch(err => {
                    res.status(err.response.status).send(err.response.data);
                });
            }
            else {
                res.redirect('/');
            }
        }
    }
}