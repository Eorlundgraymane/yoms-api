const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");

//User Calls Routed to User Controller
router.use("/user", userRouter);

router.use("/", (req, res, next) => {
  res.status(200).send("Yoms API Server is Online!");
});

module.exports = router;
