const router = require('express').Router();

const accountServices = require('../../../api/accountServices');

router.get('/fetchByID',accountServices.get.fetchByID);

router.post('/openAccount',accountServices.post.openAccount);

module.exports = router;