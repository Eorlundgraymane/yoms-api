const router = require('express').Router();

const devOpsServices = require('../services/devOpsServices');

router.put('/dbReset',devOpsServices.put.dbReset);

module.exports = router;