const router = require('express').Router();

const authController = require('../../controllers/authController');

router.use('/login', authController.login);
router.use('/logout', authController.logout);
router.use('/signup', authController.signup);

module.exports = router;