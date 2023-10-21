const router = require('express').Router();

const userServices = require('../services/userServices');

router.get('/fetchByID',userServices.get.fetchByID);

router.post('/fetchByCreds',userServices.post.fetchByCreds);

router.post('/createByCreds',userServices.post.createByCreds);

router.post('/addBeneficiary',userServices.post.addBeneficiary);

module.exports = router;