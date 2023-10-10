const router = require('express').Router();

const apiRouter = require('../../api/routers/apiRouter');
const appRouter = require('./app/appRouter');

router.use('/api',apiRouter);
router.use('/',appRouter);

module.exports = router;