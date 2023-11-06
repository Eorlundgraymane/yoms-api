const adminServices = require('../../backend/services/adminServices');

module.exports = {
    get: {

    },
    post: {
    },
    put: {
        assignRole: async (req, res) => {
            let userID = req.body.userID;
            let role = req.body.role;
            let user = await adminServices.put.role(userID, role);
            return res.send(user);
        }
    },
    delete: {

    }
}