const router = require('express').Router();

const userAPI = require('./api/userAPI');
const accountAPI = require('./api/accountAPI');
const transactionAPI = require('./api/transactionAPI');
const devOpsAPI = require('./api/devOpsAPI');

router.use('/user', userAPI);
router.use('/account', accountAPI);
router.use('/transaction', transactionAPI);
router.use('/devOps', devOpsAPI);

module.exports = router;