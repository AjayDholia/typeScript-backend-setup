
import express, { Router } from 'express';
import { loginUsers, Singup, getAllUsers, UpdateUser, DeleteUser } from '../controller/userController';

const userRouter: Router = express.Router();

// Define routes
userRouter.post('/login', loginUsers);
userRouter.post('/signup', Singup);
userRouter.get('/alluser', getAllUsers);
userRouter.post('/update', UpdateUser);
userRouter.post('/delete', DeleteUser);


// Export the router
export default userRouter;