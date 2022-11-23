const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/get", userController.getUser);
router.post("/create", userController.createUser);
router.post("/delete", userController.deleteUser);
router.post("/openAccount", userController.openAccount);
router.post("/closeAccount", userController.closeAccount);

module.exports = router;