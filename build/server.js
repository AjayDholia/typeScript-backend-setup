"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const Config_1 = require("./Mongo/Config");
const rootRouter_1 = __importDefault(require("./routers/rootRouter"));
const app = (0, express_1.default)();
const port = 8000;
// Morgan middleware for logging
app.use((0, morgan_1.default)('combined'));
// CORS setup and allowing all origins
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/2024", rootRouter_1.default);
// Establish MongoDB connection
(0, Config_1.mongoConnection)();
// Start the server
app.listen(port, () => {
    console.log("Server connected successfully on port", port);
});
