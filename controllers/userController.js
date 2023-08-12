const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

module.exports.get = {
    user: {
        infoByUserID: async (req, res) => {
            let userID = req.body.id;
            try {
                let user = await User.findByPk(userID);
                if (user != null) {
                    res.send(user);
                }
                else {
                    res.status(500).send("User Not Found!");
                }
            }
            catch (ex) {
                let user = (ex);
            }
        },
        byUserID: async (req, res) => {
            let userID = req.body.id;
            try {
                let user = await User.findByPk(userID, { include: { model: Account, include: [{ model: Transaction, as: "Debit" }, { model: Transaction, as: "Credit" }] } });
                if (user != null) {
                    res.send(user);
                }
                else {
                    res.send("User Not Found!");
                }
            }
            catch (ex) {
                console.log(ex);
                res.status(500).send(ex);
            }
        },
        infoByCreds: async (req, res) => {
            let username = req.body.username;
            let pasword = req.body.password;
            console.log(req.body)
            try {
                let user = (await User.findOne({ where: { name: username, password: pasword } }));
                if (user != null) {
                    res.send(user);
                }
                else {
                    res.status(500).send("User Not Found!");
                }
            }
            catch (ex) {
                res.status(500).send(ex);
            }
        },
        byCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            try {
                let user = (await User.findOne({ where: { name: username, password: password }, include: { model: Account, include: [{ model: Transaction, as: "Debit" }, { model: Transaction, as: "Credit" }] } }));
                if (user != null) {
                    res.send(user);
                }
                else {
                    res.status(500).send("User Not Found!");
                }
            }
            catch (ex) {
                res.status(500).send(ex);
            }

        }
    }

};


module.exports.put = {
    user: {
        createByCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            try {
                let user = await User.create({ name: username, password: password });
                res.send(user);
            }
            catch (ex) {
                res.status(500).send(ex);
            }

        },
    },
    account: {
        openByUserID: async (req, res) => {
            let userID = req.body.id;
            try {
                let user = User.findByPk(userID);
                if (user != null) {
                    let account = await user.addAccount();
                    res.send(account);
                }
                else {
                    res.status(500).send("User Not Found!");
                }
            }
            catch (ex) {
                res.status(500).send(ex);
            }

        },
        openByCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let name = req.body.name;
            let balance = req.body.balance;
            console.log(req.body);
            try {
                let user = await User.findOne({ where: { name: username, password: password } });
                if (user != null) {
                    console.log("USER FOUND!");
                    console.log(user);
                    let account = await user.createAccount({ name: name, balance: balance });
                    res.send(account);
                }
                else {
                    res.status(500).send("User Not Found!");
                }
            }
            catch (ex) {
                console.log(ex);
                res.status(500).send(ex);
            }
        }
    },
    transaction: {
        payByCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let creditorID = req.body.creditorID;
            let debitorID = req.body.debitorID;
            let amount = parseInt(req.body.amount);
            if (amount > 0 && creditorID != debitorID) {
                console.log(req.body);
                let user = await User.findOne({ where: { name: username, password: password }, include: { model: Account, where: { id: debitorID } } })
                let creditor = await Account.findByPk(creditorID);
                if (user == null) {
                    res.status(500).send("User not Found");
                    return;
                }
                if (creditor == null) {
                    res.status(500).send("Creditor not Found");
                    return;
                }
                if (user.accounts.length == 0) {
                    res.status(500).send("Debitor not Found");
                    return;
                }
                let debitor = user.accounts[0];
                if (debitor.balance >= amount) {
                    let transact = await debitor.createDebit({ CreditorId: creditorID, amount: amount });
                    if (transact != null) {
                        debitor.balance -= amount;
                        creditor.balance += amount;
                        creditor = await creditor.save();
                        debitor = await debitor.save();
                        transact.status = true;
                        transact = await transact.save()
                        res.send(transact);
                    }
                }
                else {
                    res.status(500).send("Insufficient Balance");
                }
            }
            else {
                res.status(500).send("Transaction Details Invalid!");
            }

        },
        payByUserID: async (req, res) => {
            let userID = req.body.userID;
            let creditorID = req.body.creditorID;
            let debitorID = req.body.debitorID;
            let amount = parseInt(req.body.amount);
            if (amount > 0 && creditorID != debtorID) {
                console.log(req.body);
                let user = await User.findByPk(userID, { include: { model: Account, where: { id: debitorID } } })
                let creditor = await Account.findByPk(creditorID);
                if (user == null) {
                    res.status(500).send("User not Found");
                    return;
                }
                if (creditor == null) {
                    res.status(500).send("Creditor not Found");
                    return;
                }
                if (user.accounts.length == 0) {
                    res.status(500).send("Debitor not Found");
                    return;
                }
                let debitor = user.accounts[0];
                if (debitor.balance >= amount) {
                    let transact = await debitor.createDebit({ CreditorId: creditorID, amount: amount });
                    if (transact != null) {
                        debitor.balance -= amount;
                        creditor.balance += amount;
                        creditor = await creditor.save();
                        debitor = await debitor.save();
                        transact.status = true;
                        transact = await transact.save()
                        res.send(transact);
                    }
                }
                else {
                    res.status(500).send("Insufficient Balance");
                }
            }
            else {
                res.status(500).send("Transaction Details Invalid!");
            }

        }
    }


}

module.exports.post = {
    account: {
        closeByCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let accountID = req.body.accountID;
            console.log(req.body);
            try {
                let user = await User.findOne({ where: { name: username, password: password }, include: { model: Account, where: { id: accountID } } });
                console.log(user);
                if (user.accounts.length > 0) {
                    let account = user.accounts[0];
                    if (account.isActive) {
                        account.isActive = false;
                        account = await account.save();
                        res.send(account);
                    }
                    else {
                        res.status(500).send("Account is already Closed");
                    }
                } else {
                    res.status(500).send("Account not Found!");
                }

            }
            catch (ex) {
                console.log(ex);
                res.status(500).send(ex);
            }
        },
        closeByUserID: async (req, res) => {
            let userID = req.body.userID;
            let accountID = req.body.accountID;
            console.log(req.body);
            try {
                let user = await User.findByPk(userID, { include: { model: Account, where: { id: accountID } } });
                console.log(user);
                if (user.accounts.length > 0) {
                    let account = user.accounts[0];
                    if (account.isActive) {
                        account.isActive = false;
                        account = await account.save();
                        res.send(account);
                    }
                    else {
                        res.status(500).send("Account is already Closed");
                    }
                } else {
                    res.status(500).send("Account not Found!");
                }

            }
            catch (ex) {
                console.log(ex);
                res.status(500).send(ex);
            }
        }
    }
}

module.exports.delete = {
    user: {
        byCreds: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            try {
                let user = await User.destroy({ name: username, password: password });
                res.send(user);
            }
            catch (ex) {
                res.status(500).send(ex);
            }
        },
        byUserID: async (req, res) => {
            let userID = req.body.id;
            try {
                let user = await User.destroy(userID);
                res.send(user);
            }
            catch (ex) {
                res.status(500).send(ex);
            }
        }
    }
}