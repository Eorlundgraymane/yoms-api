const router = require('express').Router();

const adminController = require('../../controllers/adminController');

router.use(adminController.get.authenticate);
router.get('/userinfo/*', adminController.get.userinfo);
router.get('/userlist', adminController.get.userlist);
router.get('/account/*', adminController.get.accountInfo);
router.get('/', adminController.get.adminConsole);

router.post('/account/open', adminController.post.openAccount);

module.exports = router;