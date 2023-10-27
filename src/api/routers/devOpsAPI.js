const router = require('express').Router();

const devOpsController = require('../controllers/devOpsController');

router.get('/dbReset', devOpsController.DB.reset);

module.exports = router;