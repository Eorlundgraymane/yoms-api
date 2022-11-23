const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");

router.post("/init", transactionController.initTransaction);
router.get("/get",transactionController.getTransactions);

module.exports = router;
