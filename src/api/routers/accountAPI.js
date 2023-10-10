const router = require('express').Router();

const accountServices = require('../services/accountServices');

router.post('/fetchByID',accountServices.get.fetchByID);

router.post('/fetchByUserID',accountServices.get.fetchByUserID);

router.post('/openAccount',accountServices.post.openAccount);

module.exports = router;