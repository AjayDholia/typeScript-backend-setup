import { mongoConnection } from "./Mongo/Config";

var express : any = require('express')
const cors = require("cors");
var morgan = require('morgan')
const app = express();
var rootRouter = require("./routers/rootRouter");

app.use(morgan('combined'))

app.use((req: any, res: any, next: any) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json());
app.use(cors());
app.use("/api/2024", rootRouter);
const port = 8000;
mongoConnection();
// app.get("/", (req: any, res: any) => {
//     res.send("hello india")
// })

app.listen(port, () => {
    console.log("just connected successfully ",port)
})