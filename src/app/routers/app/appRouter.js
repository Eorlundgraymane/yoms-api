const authRouter = require('./authRouter');
const pageRouter = require('./pageRouter');

const router = require('express').Router();

router.use('/auth',authRouter);
router.use(pageRouter);

module.exports = router;
