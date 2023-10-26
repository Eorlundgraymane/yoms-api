const router = require('express').Router();

router.use((req,res,next) => {
    req.body.isAuth = true;
    next();
});

module.exports = router;
