const router = require('express').Router();

const transactionServices = require('../services/transactionServices');

router.get('/fetchByID',transactionServices.get.fetchByID);

router.post('/pay',transactionServices.post.pay);

module.exports = router;