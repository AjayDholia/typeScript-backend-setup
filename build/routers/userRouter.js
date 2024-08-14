"use strict";
// var express: any = require("express");
// var { loginUsers, Singup, getAllUsers, UpdateUser } = require("../controller/userController")
// var userRouter = express.Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// userRouter.post("/login", loginUsers);
// userRouter.post("/signup", Singup);
// userRouter.get("/alluser", getAllUsers);
// userRouter.post("/update", UpdateUser);
// module.exports = userRouter;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userRouter = express_1.default.Router();
// Define routes
userRouter.post('/login', userController_1.loginUsers);
userRouter.post('/signup', userController_1.Singup);
userRouter.get('/alluser', userController_1.getAllUsers);
userRouter.post('/update', userController_1.UpdateUser);
// Export the router
exports.default = userRouter;
