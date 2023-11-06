const authRouter = require('./authRouter');
const pageRouter = require('./pageRouter');
const adminRouter = require('./adminRouter');

const router = require('express').Router();

router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use(pageRouter);

module.exports = router;
