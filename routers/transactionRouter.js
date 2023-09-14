const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.get("/getByID",transactionController.get.transaction.byID);
router.get("/getInfoByID",transactionController.get.transaction.infoByID);

router.put("/payByAccountIDs", transactionController.put.transaction.payByAccountIDs);
router.put("/revertByID", transactionController.put.transaction.revertByID);


module.exports = router;