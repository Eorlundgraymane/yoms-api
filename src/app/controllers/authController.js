const userServices = require('../../backend/services/userServices');

module.exports = {
    get: {
        authenticate: (req, res, next) => {
            if (req.session.isAuth) {
                next();
            }
            else {
                res.redirect('/auth/login');
            }
        },
        loginPage: (req, res) => {
            if (req.session.isAuth) {
                res.redirect('/');
            }
            else {
                let params = {};
                res.render('auth/login.ejs', params);
            }
        },
        logout: (req, res) => {
            req.session.destroy();
            res.redirect('/')
        },
        signUpPage: (req, res) => {
            if (req.session.isAuth) {
                res.redirect('/');
            }
            else {
                let params = {};
                res.render('auth/signup.ejs', params);
            }
        }
    },
    post: {
        login: async (req, res) => {
            if (req.session.isAuth == null || !req.session.isAuth) {
                let username = req.body.username;
                let password = req.body.password;
                let user = await userServices.findByCreds(username, password,true,true);
                if (user == null || user.ID == null) {
                    let params = {};
                    params.errorMessage = 'Username or password not correct'
                    res.render('auth/login.ejs', params);
                }
                else {
                    req.session.user = user;
                    req.session.isAuth = true;
                    res.redirect('/');
                }
            }
        },
        signUp: async (req, res) => {
            if (req.session.isAuth == null || !req.session.isAuth) {
                let username = req.body.username;
                let password = req.body.password;
                let user = await userServices.createByCreds(username, password);
                if (user == null || user.ID == null) {
                    let params = {};
                    params.errorMessage = 'Username already exists'
                    res.render('auth/signup.ejs',params)
                }
                else {
                    req.session.user = user;
                    req.session.isAuth = true;
                    res.redirect('/');
                }
            }
            else {
                res.redirect('/');
            }
        }
    }
}