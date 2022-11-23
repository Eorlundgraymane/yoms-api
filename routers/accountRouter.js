const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.post("/delete", accountController.deleteAccount);
router.post("/update", accountController.updateAccount);


module.exports = router;
