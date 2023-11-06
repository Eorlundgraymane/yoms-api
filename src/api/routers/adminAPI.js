const router = require('express').Router();

const adminController = require('../controllers/adminController');

router.put('/assignRole', adminController.put.assignRole);

module.exports = router;