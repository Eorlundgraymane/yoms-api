const router = require('express').Router();

router.use('/',(req,res,next) => {
    if(req.body.isAuth){
        next();
    }
    else{
        res.redirect('/login');
    }
});

module.exports = router;
