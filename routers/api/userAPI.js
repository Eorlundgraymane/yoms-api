const router = require('express').Router();

const userServices = require('../../api/userServices');

router.get('/fetchByID',userServices.get.fetchByID);

router.get('/fetchByCreds',userServices.get.fetchByCreds);

router.post('/createByCreds',userServices.post.createByCreds);

module.exports = router;