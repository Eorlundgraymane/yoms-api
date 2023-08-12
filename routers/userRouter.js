const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/getInfoByUserID",userController.get.user.infoByUserID);
router.get("/getByID",userController.get.user.byUserID);
router.get("/getInfoByCreds",userController.get.user.infoByCreds);
router.get("/getByCreds",userController.get.user.byCreds);

router.put("/createByCreds",userController.put.user.createByCreds);


router.delete("/deleteByID", userController.delete.user.byUserID);
router.delete("/deleteByCreds", userController.delete.user.byCreds);

module.exports = router;