const router = require('express').Router();

const accountController = require('../controllers/accountController');

router.get('/fetchByID',accountController.get.findByID);

router.post('/openAccount',accountController.post.createByParams);

router.post('/pay',accountController.post.pay);

module.exports = router;