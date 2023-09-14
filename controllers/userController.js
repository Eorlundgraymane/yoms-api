const User = require("../models/user");
const Account = require("../models/account");
const Transaction = require("../models/transaction");

module.exports.get = {
    user: {
        infoByID: async (req, res) => {
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
                console.log(ex);
                res.status(500).send(ex);
            }
        },
        byID: async (req, res) => {
            let userID = req.body.id;
            try {
                let user = await User.findByPk(userID, { include: { model: Account } });
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
    }

};


module.exports.put = {
    user: {
        create: async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            try {
                let user = await User.create({ name: username, password: password });
                res.send(user);
            }
            catch (ex) {
                console.log(ex);
                res.status(500).send(ex);
            }

        },
    },

}

module.exports.post = {
    //To Be Developed   
}

module.exports.delete = {
    user: {
        byUserID: async (req, res) => {
            let userID = req.body.userID;
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