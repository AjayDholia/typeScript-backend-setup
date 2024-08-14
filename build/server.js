"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Config_1 = require("./Mongo/Config");
var express = require('express');
const cors = require("cors");
var morgan = require('morgan');
const app = express();
var rootRouter = require("./routers/rootRouter");
app.use(morgan('combined'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(express.json());
app.use(cors());
app.use("/api/2024", rootRouter);
const port = 8000;
(0, Config_1.mongoConnection)();
// app.get("/", (req: any, res: any) => {
//     res.send("hello india")
// })
app.listen(port, () => {
    console.log("just connected successfully ", port);
});
