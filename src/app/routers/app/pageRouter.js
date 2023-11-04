const router = require('express').Router();

const authController = require('../../controllers/authController');
const pageController = require('../../controllers/pageController');

router.use(authController.get.authenticate);
router.get('/accounts', pageController.get.accounts);
router.get('/statement/*', pageController.get.statement);
router.get('/account/*', pageController.get.account);
router.get('/beneficiary', pageController.get.beneficiary);
router.get('/', pageController.get.dashboard);

router.post('/pay', pageController.post.pay);
router.post('/beneficiary/remove/*', pageController.post.beneficiary);
router.post('/beneficiary', pageController.post.beneficiary);

module.exports = router;