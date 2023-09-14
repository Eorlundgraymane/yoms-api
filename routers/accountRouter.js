const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.get("/getInfoByID",accountController.get.account.infoByID);
router.get("/getByID",accountController.get.account.byID);

router.put("/openByUserID",accountController.put.account.openByUserID);

router.post("/closeByID",accountController.post.account.closeByID);

module.exports = router;