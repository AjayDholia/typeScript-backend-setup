"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter_1 = __importDefault(require("./userRouter"));
const rootRouter = express_1.default.Router();
// Attach the userRouter to the /user path
rootRouter.use('/user', userRouter_1.default);
// Attach other routers if needed
// rootRouter.use('/task', taskRouter);
exports.default = rootRouter;
