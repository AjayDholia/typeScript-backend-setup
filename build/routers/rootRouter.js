"use strict";
var express = require("express");
var userRouter = require("./userRouter");
var rootRouter = express.Router();
rootRouter.use("/user", userRouter);
// rootRouter.use("/task", taskRouter);
module.exports = rootRouter;
