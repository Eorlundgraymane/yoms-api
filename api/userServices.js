const modelController = require('../src/controllers/modelController');
let User = require('../src/models/user');

module.exports = {
    get: {
        fetchByID: async (req, res) => {            
            let userID = req.body.userID;
            modelController.fetch.byID(User, userID, user => res.send(user), err => res.status(404).send(err))
        },
        fetchByCreds: (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let params = { where: { username: username, password: password } };
            modelController.fetch.byParams(User, params, user => res.send(user), err => res.status(404).send(err));
        }
    },
    post: {
        createByCreds: (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let params = {username: username, password: password };
            modelController.create.byParams(User, params, user => res.send(user), err => res.status(403).send(err));
        }
    }
}