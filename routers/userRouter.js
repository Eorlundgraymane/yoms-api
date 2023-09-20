const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");


router.post("/getInfoByCreds",userController.get.user.infoByCreds);
router.get("/getInfoByUserID",userController.get.user.infoByID);
router.get("/getByUserID",userController.get.user.byID);

router.put("/createNewUser",userController.put.user.create);

//DO NOT USE
router.delete("/deleteByUserID", userController.delete.user.byUserID);

module.exports = router;