const router = require('express').Router();

const transactionServices = require('../../../api/transactionServices');

router.get('/fetchByID',transactionServices.get.fetchByID);

router.post('/pay',transactionServices.post.pay);

module.exports = router;