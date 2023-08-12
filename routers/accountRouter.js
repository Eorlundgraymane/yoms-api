const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");
const userController = require("../controllers/userController");

router.get("/getByID",accountController.get.account.getByID);

router.put("/openByUserID",userController.put.account.openByUserID);
router.put("/openByCreds",userController.put.account.openByCreds);


router.post("/closeByCreds",userController.post.account.closeByCreds);
router.post("/closeByUserID",userController.post.account.closeByUserID);

router.post("/closeByID",accountController.post.account.closeByID);



module.exports = router;