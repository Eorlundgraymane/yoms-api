const router = require('express').Router();

const transactionController = require('../controllers/transactionController');

router.get('/fetchByID',transactionController.get.findByID);

module.exports = router;