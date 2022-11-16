const express = require("express");
const router = express.Router();

const accountController = require("../controllers/accountController");

router.post("/delete", accountController.deleteAccount);

module.exports = router;
