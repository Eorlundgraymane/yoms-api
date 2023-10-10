const modelController = require('../../backend/controllers/modelController');
let User = require('../../backend/models/user');

module.exports = {
    authenticate: (req, res, next) => {

        if (req.session == null || req.session.user == null) {
            console.log("NOT LOGGED IN");
            next();
        }
        else {
            console.log("STILL LOGGED IN");
            let user = req.session.user;
            let username = user.username;
            let password = user.password;
            let params = { where: { username: username, password: password } };
            console.log(params);
            modelController.fetch.byParams(User, params, async user => {                
                req.session.loggedIn = true;          
                next();
            }, err => {
                req.err = err;
                req.session.destroy();
                next();
            });
        }


    },
    signup: (req, res) => {
        let username = req.body.username;
        let password = req.body.password;
        let params = { username: username, password: password };
        console.log(params);
        modelController.create.byParams(User, params, async user => {
            req.user = user;
            req.loggedIn = true;        
            next();
        }, err => {
            req.session.destroy();
            res.redirect('/');
        });
    },
    login: (req, res) => {   
        if (req.session != null && req.session.user != null) {
            console.log("LOGGED IN");
            res.redirect('/');
        }
        else{            
            let username = req.body.username;
            let password = req.body.password;
            let params = { where: { username: username, password: password } };
            console.log(params);
            modelController.fetch.byParams(User, params, user => {
                req.session.user = user;
                req.session.loggedIn = true;
                console.log(req.session);
                console.log("LOGGING IN");        
                res.redirect('/');
            }, err => {
                req.session.destroy();
                res.redirect('/');
            });
        }
        
    },
    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/');

    }
}