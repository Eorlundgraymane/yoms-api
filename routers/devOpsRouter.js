const devOpsController = require("../controllers/devOpsController");

const express = require("express");
const router = express.Router();

router.get("/dbReset",devOpsController.dbreset);

module.exports = router;