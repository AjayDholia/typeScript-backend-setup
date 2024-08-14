"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = exports.mongoConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jwtConfig = {
    JWT_PRIVATE_KEY: "shipper",
    EXPIRE_TIME: 24, // HOURS
};
exports.jwtConfig = jwtConfig;
const mongoConnection = () => {
    const url = "mongodb+srv://user:mTnorYAZfm5t7cst@frienxe.jv5ezxh.mongodb.net/shipper";
    mongoose_1.default
        .connect(url, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology : any: true,
    })
        .then(() => {
        console.log("DB connection established!!");
    })
        .catch((err) => {
        console.log("Connection to DB failed");
        console.log(err.message);
    });
};
exports.mongoConnection = mongoConnection;
