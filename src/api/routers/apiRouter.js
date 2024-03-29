const router = require('express').Router();

const userAPI = require('./userAPI');
const accountAPI = require('./accountAPI');
const transactionAPI = require('./transactionAPI');
const devOpsAPI = require('./devOpsAPI');
const adminAPI = require('./adminAPI');

router.use('/user', userAPI);
router.use('/account', accountAPI);
router.use('/devOps', devOpsAPI);
router.use('/transaction', transactionAPI);
router.use('/admin', adminAPI);
router.use('/', (req, res) => {
    res.status(404).send("404 API Not Found");
});

module.exports = router;