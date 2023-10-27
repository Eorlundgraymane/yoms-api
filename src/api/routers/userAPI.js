const router = require('express').Router();

const userController = require('../controllers/userController');

router.get('/fetchByID',userController.get.findByID);

router.get('/fetchByCreds',userController.get.findByCreds);

router.post('/createByCreds',userController.post.createByCreds);

router.post('/addBeneficiary',userController.post.addBeneficiary);

module.exports = router;