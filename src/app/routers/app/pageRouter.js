const router = require('express').Router();

const authController = require('../../controllers/authController');
const pageController = require('../../controllers/pageController');

router.get('/dashboard', authController.authenticate, pageController.post.dashboard);
router.get('/', authController.authenticate,pageController.get.landingPage);

module.exports = router;