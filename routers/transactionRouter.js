const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.put("/payByUserID", userController.put.transaction.payByUserID);
router.put("/payByCreds", userController.put.transaction.payByCreds);


module.exports = router;