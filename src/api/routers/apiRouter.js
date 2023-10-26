const router = require('express').Router();

const userAPI = require('./userAPI');
const accountAPI = require('./accountAPI');
const transactionAPI = require('./transactionAPI');
const devOpsAPI = require('./devOpsAPI');
const authAPI = require('./authAPI');

router.use(authAPI);
router.use('/user', userAPI);
router.use('/account', accountAPI);
router.use('/transaction', transactionAPI);
router.use('/devOps', devOpsAPI);

module.exports = router;