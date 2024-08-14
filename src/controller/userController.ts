
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import Users from '../models/userModel';
import { jwtConfig } from '../Mongo/Config';

// Define the salt rounds for bcrypt
const saltRounds = 12;

// Signup Function
const Singup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { password, email } = req.body;
    try {
        const isUser = await Users.findOne({ email });
        if (isUser) throw new Error('User Already Registered!');

        const hash = await bcrypt.hash(password, saltRounds);

        const user = await Users.create({
            ...req.body,
            password: hash,
        });

        res.status(200).send({
            success: true,
            msg: 'User Created Successfully!',
            response: {
                user,
            },
        });
    } catch (err: any) {
        console.log({ err });
        res.status(400).send({
            success: false,
            msg: 'User Not Created!',
            err: err.message || err,
        });
    }
};

// Login Function
const loginUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        console.log({ user });
        if (!user) throw new Error('User Not Exist!');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Wrong Password!');

        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                userStatus: user.userStatus,
                password: user.password,
            },
            jwtConfig.JWT_PRIVATE_KEY,
        );

        res.status(200).send({
            success: true,
            msg: 'Login Successfully!',
            response: {
                token,
                user,
            },
        });
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: 'Login Failed!',
            error: err.message || err,
        });
    }
};

// Get All Users Function
const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await Users.find();
        console.log({ users });

        if (!users || users.length === 0) throw new Error('No Users Found!');

        res.status(200).send({
            success: true,
            msg: 'Users Retrieved Successfully!',
            response: {
                users,
            },
        });
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: 'Failed to Retrieve Users!',
            error: err.message || err,
        });
    }
};

// Update User Function
const UpdateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id, newPassword } = req.body;
    try {
        let updateData = { ...req.body }; // Clone the request body
        if (newPassword) {
            const hash = await bcrypt.hash(newPassword, saltRounds);
            updateData.password = hash; // Add the hashed password to update data
        } else {
            delete updateData.password; // Ensure password isn't overwritten with an empty value
        }

        const user = await Users.findByIdAndUpdate(_id, updateData, { new: true });
        console.log({ user });

        if (!user) throw new Error('User Not Exist!');

        res.status(200).send({
            success: true,
            msg: 'Updated Successfully!',
            response: {
                user,
            },
        });
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: 'Update Failed!',
            error: err.message || err,
        });
    }
};


const DeleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { _id } = req.body;
    try {


        const user = await Users.findByIdAndDelete(_id)
        console.log({ user });

        if (!user) throw new Error('User Not Exist!');

        res.status(200).send({
            success: true,
            msg: 'Deleted Successfully!',
            response: {
                user,
            },
        });
    } catch (err: any) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: 'Update Failed!',
            error: err.message || err,
        });
    }
};
// Export all the functions
export {
    loginUsers,
    Singup,
    getAllUsers,
    UpdateUser,
    DeleteUser
};
