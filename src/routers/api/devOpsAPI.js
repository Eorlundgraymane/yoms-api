const router = require('express').Router();

const devOpsServices = require('../../../api/devOpsServices');

router.put('/dbReset',devOpsServices.put.dbReset);

module.exports = router;