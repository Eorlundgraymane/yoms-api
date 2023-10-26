const authRouter = require('./authRouter');

const router = require('express').Router();

router.use(authRouter);
router.use('/',(req,res) => {
    if(req.body.isAuth){
        res.send("<html><h1>APP is Authenticated and Online</h1></html>");
    }
    else{
        res.send("<html><h1>APP is Online</h1></html>");
    }    
});

module.exports = router;
