
import express, { Router } from 'express';
import { loginUsers, Singup, getAllUsers, UpdateUser } from '../controller/userController';

const userRouter: Router = express.Router();

// Define routes
userRouter.post('/login', loginUsers);
userRouter.post('/signup', Singup);
userRouter.get('/alluser', getAllUsers);
userRouter.post('/update', UpdateUser);

// Export the router
export default userRouter;