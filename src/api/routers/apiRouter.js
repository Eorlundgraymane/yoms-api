const router = require('express').Router();

const userAPI = require('./userAPI');
const accountAPI = require('./accountAPI');
const transactionAPI = require('./transactionAPI');
const devOpsAPI = require('./devOpsAPI');

router.use('/user', userAPI);
router.use('/account', accountAPI);
router.use('/transaction', transactionAPI);
router.use('/devOps', devOpsAPI);

module.exports = router;