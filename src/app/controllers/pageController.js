

module.exports = {
    get: {
        landingPage: (req, res) => {
            console.log("LANDING");
            if (req.session != null && req.session.loggedIn != null && req.session.loggedIn) {
                console.log("AUTHED");
                res.redirect('/dashboard');
            }
            else {    
                console.log("NOT AUTHED");            
                res.render('index.ejs');
            }
        },
    },
    post: {
        dashboard: (req, res) => {
            console.log("DASHBOARD");
            if (req.session != null && req.session.loggedIn !== null && req.session.loggedIn) {
                res.render('dashboard.ejs');
            }
            else {
                res.redirect('/');
            }

        }
    }
}