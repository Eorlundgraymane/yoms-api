const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const accountRouter = require("./accountRouter");
const transactionRouter = require("./transactionRouter");
const devOpsRouter = require("./devOpsRouter");

router.use("/user", userRouter);
router.use("/account", accountRouter);
router.use("/transaction", transactionRouter);
router.use("/devOps",devOpsRouter);
router.get("/",(req, res) => {
    res.send("API is Online!");
});
const errorController = require("../controllers/errorController");
router.use(errorController.NotFound);


module.exports = router;