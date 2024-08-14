"use strict";
var express = require("express");
var { loginUsers, Singup, getAllUsers, UpdateUser } = require("../controller/userController");
var userRouter = express.Router();
userRouter.post("/login", loginUsers);
userRouter.post("/signup", Singup);
userRouter.get("/alluser", getAllUsers);
userRouter.post("/update", UpdateUser);
module.exports = userRouter;
