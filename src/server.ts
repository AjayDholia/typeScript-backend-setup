
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { mongoConnection } from './Mongo/Config';
import rootRouter from './routers/rootRouter';

const app = express();
const port = 8000;

// Morgan middleware for logging
app.use(morgan('combined'));

// CORS setup and allowing all origins
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(express.json());
app.use(cors());
app.use("/api/2024", rootRouter);

// Establish MongoDB connection
mongoConnection();

// Start the server
app.listen(port, () => {
    console.log("Server connected successfully on port", port);
});
