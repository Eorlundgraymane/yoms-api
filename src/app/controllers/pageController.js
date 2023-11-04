let accountServices = require('../../backend/services/accountServices');
let beneficiaryServices = require('../../backend/services/beneficiaryServices');
const userServices = require('../../backend/services/userServices');

let sorter = require('../helpers/sorter');

module.exports = {
    get: {
        dashboard: (req, res) => {
            let params = {};
            params.user = req.session.user;
            res.render('dashboard/index.ejs', params);
        },
        accounts: async (req, res) => {
            let user = req.session.user;
            let accounts = await accountServices.findByUserID(user.ID);
            let params = {};
            params.user = user;
            params.accounts = accounts;
            res.render('accounts/index.ejs', params);
        },
        account: async (req, res) => {
            console.log(req.params);
            let accountID = req.params[0];
            let account = await accountServices.findByID(accountID, true, true);
            let user = await userServices.findByID(account.userID,true,true);
            let params = {};
            params.account = account;
            req.session.user = user;
            params.user = user;
            res.render('accounts/details.ejs', params);
        },
        statement: async (req, res) => {
            let accountID = req.params[0];
            let account = await accountServices.findByID(accountID, true, true);
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
        },
        beneficiary: async (req, res) => {
            let params = {};
            let user = req.session.user;
            let beneficiaries = await beneficiaryServices.findByUserID(user.ID, true);
            params.beneficiaries = beneficiaries
            params.user = user;
            return res.render('beneficiary/index.ejs', params);
        }
    },
    post: {
        pay: async (req, res) => {
            let creditorID = parseInt(req.body.creditorID);
            let amount = parseInt(req.body.amount);
            let debtorID = parseInt(req.body.accountID);
            let user = req.session.user;
            if (Number.isNaN(debtorID)) {
                res.redirect('/');
            }
            let debtor = await accountServices.findByID(debtorID, true);
            if (Number.isNaN(creditorID) || Number.isNaN(amount)) {
                let params = {};
                params.errorMessage = 'AccountIDs or Transaction Amount cannot be blank ';
                params.user = req.session.user;
                params.account = debtor;
                return res.render('accounts/details.ejs', params);
            }
            if (creditorID == debtorID) {
                let params = {};
                params.errorMessage = 'Cannot transfer to same account';
                params.account = debtor;
                params.user = req.session.user;
                return res.render('accounts/details.ejs', params);
            }
            if (amount <= 0) {
                let params = {};
                params.errorMessage = 'Transaction amount can only positive';
                params.account = debtor;
                params.user = req.session.user;
                return res.render('accounts/details.ejs', params);
            }
            if (amount > debtor.balance) {
                let params = {};
                params.errorMessage = 'Insufficient balance';
                params.account = debtor;
                params.user = req.session.user;
                return res.render('accounts/details.ejs', params);
            }
            if (debtor == null || debtor.user.ID != user.ID) {
                return res.redirect('/logout');
            }
            let creditor = await accountServices.findByID(creditorID, true);
            console.log(creditor);
            if (creditor == null) {
                let params = {};
                params.errorMessage = 'Invalid Recipient Account';
                params.account = debtor;
                params.user = req.session.user;
                return res.render('accounts/details.ejs', params);
            }
            let transaction = await accountServices.createTransaction(creditorID, debtorID, amount);
            console.log(transaction);
            if (transaction == null || transaction.ID == null) {
                let params = {};
                params.errorMessage = 'Transaction Failed';
                params.account = debtor;
                params.user = req.session.user;
                return res.render('accounts/details.ejs', params);
            }
            else {
                let params = {};
                params.userMessage = 'Transaction Successfull';
                debtor = await accountServices.findByID(debtorID, true);
                params.account = debtor;
                params.user = req.session.user;
                return res.redirect('/account/' + debtorID);
            }
        },
        beneficiary: async (req, res) => {
            let params = {};
            let accountID = parseInt(req.body.accountID);
            let nickname = req.body.nickname;
            let user = req.session.user;
            params.user = user;
            if (Number.isNaN(accountID) || nickname == '') {
                let beneficiaries = await beneficiaryServices.findByUserID(user.ID);
                params.beneficiaries = beneficiaries
                params.errorMessage = "Please provide correct details of Beneficiary";
                return res.render('beneficiary/index.ejs', params);
            }
            let account = await accountServices.findByID(accountID, true);
            if (account == null) {
                let beneficiaries = await beneficiaryServices.findByUserID(user.ID);
                params.beneficiaries = beneficiaries
                params.errorMessage = "Beneficiary does not exist";
                return res.render('beneficiary/index.ejs', params);
            }
            console.log(account);
            if (account.userID == user.ID) {
                let beneficiaries = await beneficiaryServices.findByUserID(user.ID, true);
                params.beneficiaries = beneficiaries
                params.errorMessage = "Cannot add own account as beneficiary";
                return res.render('beneficiary/index.ejs', params);
            }
            let beneficiary = await beneficiaryServices.createByParams(user.ID, accountID, nickname);
            if (beneficiary.ID == null) {
                let beneficiaries = await beneficiaryServices.findByUserID(user.ID, true);
                params.beneficiaries = beneficiaries
                params.errorMessage = "Beneficiary Details invalid";
                return res.render('beneficiary/index.ejs', params);
            }
            else {
                res.redirect('/beneficiary');
            }

        },
        removeBeneficiary: (req, res) => {
            let beneficiaryID = req.params[0];
            let user = req.session.user;
            user = userServices.findByID(user.ID, true);
            user.beneficiaries

        }
    }
}