import express, { Router } from 'express';
import userRouter from './userRouter';

const rootRouter: Router = express.Router();

// Attach the userRouter to the /user path
rootRouter.use('/user', userRouter);

// Attach other routers if needed
// rootRouter.use('/task', taskRouter);

export default rootRouter;