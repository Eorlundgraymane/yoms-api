const router = require('express').Router();

const authController = require('../../controllers/authController');
const pageController = require('../../controllers/pageController');

router.post('/accounts',authController.authenticate, pageController.get.accountsPage)
router.post('/account',authController.authenticate, pageController.get.accountPage)
router.post('/pay',authController.authenticate, pageController.get.pay)
router.post('/dashboard', authController.authenticate, pageController.get.dashboard);
router.get('/', authController.authenticate,pageController.get.landingPage);

module.exports = router;