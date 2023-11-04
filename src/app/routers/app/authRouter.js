const router = require('express').Router();

const authController = require('../../controllers/authController');

router.get('/login',authController.get.loginPage);
router.get('/signup',authController.get.signUpPage);
router.get('/logout',authController.get.logout);

router.post('/login',authController.post.login);
router.post('/signup',authController.post.signUp);


module.exports = router;
