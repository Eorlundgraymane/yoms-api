const router = require('express').Router();

const userAPI = require('./userAPI');
const accountAPI = require('./accountAPI');
const devOpsAPI = require('./devOpsAPI');
const authAPI = require('./authAPI');

router.use('/user', userAPI);
router.use('/account', accountAPI);
router.use('/devOps', devOpsAPI);

module.exports = router;