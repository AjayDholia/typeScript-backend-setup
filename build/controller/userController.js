"use strict";
// const bcrypt = require("bcrypt");
// var jwt = require("jsonwebtoken");
// var Users = require("../models/userModel")
// import { Request, Response, NextFunction } from "express";
// import { jwtConfig } from "../Mongo/Config";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.getAllUsers = exports.Singup = exports.loginUsers = void 0;
// var saltRounds = 12;
// var Singup: any = async (req: Request, res: Response, next: NextFunction) => {
//     const { password, email } = req.body;
//     try {
//         const isUser = await Users.findOne({ email });
//         if (isUser) throw "user Already registered!";
//         const hash = await bcrypt.hash(password, saltRounds);
//         const user = await Users.create(
//             {
//                 ...req.body,
//                 password: hash,
//             }
//         );
//         res.status(200).send({
//             success: true,
//             msg: "User Created Successfully!",
//             response: {
//                 user: user,
//             },
//         });
//     } catch (err) {
//         console.log({ err })
//         res.status(400).send({
//             success: false,
//             msg: "user Not Created!",
//             err,
//         });
//     }
// }
// var loginUsers: any = async (req: Request, res: Response, next: NextFunction) => {
//     const { email, password } = req.body;
//     try {
//         let user = await Users
//             .findOne({ email })
//         console.log({ user })
//         if (!user) throw "User Not Exist!";
//         const match = await bcrypt.compare(password, user.password);
//         if (!match) throw "Wrong Password!";
//         var token = jwt.sign(
//             {
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 userType: user.userType,
//                 userStatus: user.userStatus,
//                 password: user.password
//             },
//             jwtConfig.JWT_PRIVATE_KEY
//         );
//         console.log({ user })
//         res.status(200).send({
//             success: true,
//             msg: "Login Successfully!",
//             response: {
//               token,
//               user: user,
//             },
//         });
//     } catch (err: any) {
//         console.log(err.toString())
//         res.status(400).send({
//             success: false,
//             msg: "Login Failed!",
//             error: err,
//         });
//     }
// };
// var getAllUsers: any = async (req: Request, res: Response, next: NextFunction) => {
//     // const { user : any } = req;
//     try {
//         let user = await Users.find()
//         console.log({user})
//         if (!user) throw "User Not Exist!";
//         res.status(200).send({
//             success: true,
//             msg: "Users Get Successfully!",
//             response: {
//                 user: user,
//             },
//         });
//     } catch (err: any) {
//         console.log(err.toString())
//         res.status(400).send({
//             success: false,
//             msg: "Users Get Failed!",
//             error: err,
//         });
//     }
// };
// var UpdateUser: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
//     const { _id, newPassword } = req.body;
//     try {
//         let updateData = { ...req.body }; // Clone the request body
//         if (newPassword) {
//             const hash = await bcrypt.hash(newPassword, saltRounds);
//             updateData.password = hash; // Add the hashed password to update data
//         } else {
//             delete updateData.password; // Ensure password isn't overwritten with an empty value
//         }
//         console.log({updateData})
//         const user = await Users.findByIdAndUpdate(_id, updateData, { new: true })
//         console.log({ user })
//         if (!user) throw "User Not Exist!";
//         res.status(200).send({
//             success: true,
//             msg: "Updated Successfully Successfully!",
//             response: {
//                 user: user,
//             },
//         });
//     } catch (err: any) {
//         console.log(err.toString())
//         res.status(400).send({
//             success: false,
//             msg: "updation Failed Failed!",
//             error: err,
//         });
//     }
// };
// module.exports = {
//     loginUsers,
//     Singup,
//     getAllUsers,
//     UpdateUser
// }
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const Config_1 = require("../Mongo/Config");
// Define the salt rounds for bcrypt
const saltRounds = 12;
// Signup Function
const Singup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const isUser = yield userModel_1.default.findOne({ email });
        if (isUser)
            throw new Error('User Already Registered!');
        const hash = yield bcrypt_1.default.hash(password, saltRounds);
        const user = yield userModel_1.default.create(Object.assign(Object.assign({}, req.body), { password: hash }));
        res.status(200).send({
            success: true,
            msg: 'User Created Successfully!',
            response: {
                user,
            },
        });
    }
    catch (err) {
        console.log({ err });
        res.status(400).send({
            success: false,
            msg: 'User Not Created!',
            err: err.message || err,
        });
    }
});
exports.Singup = Singup;
// Login Function
const loginUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        console.log({ user });
        if (!user)
            throw new Error('User Not Exist!');
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            throw new Error('Wrong Password!');
        const token = jsonwebtoken_1.default.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            password: user.password,
        }, Config_1.jwtConfig.JWT_PRIVATE_KEY);
        res.status(200).send({
            success: true,
            msg: 'Login Successfully!',
            response: {
                token,
                user,
            },
        });
    }
    catch (err) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: 'Login Failed!',
            error: err.message || err,
        });
    }
});
exports.loginUsers = loginUsers;
// Get All Users Function
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        console.log({ users });
        if (!users || users.length === 0)
            throw new Error('No Users Found!');
        res.status(200).send({
            success: true,
            msg: 'Users Retrieved Successfully!',
            response: {
                users,
            },
        });
    }
    catch (err) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: 'Failed to Retrieve Users!',
            error: err.message || err,
        });
    }
});
exports.getAllUsers = getAllUsers;
// Update User Function
const UpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, newPassword } = req.body;
    try {
        let updateData = Object.assign({}, req.body); // Clone the request body
        if (newPassword) {
            const hash = yield bcrypt_1.default.hash(newPassword, saltRounds);
            updateData.password = hash; // Add the hashed password to update data
        }
        else {
            delete updateData.password; // Ensure password isn't overwritten with an empty value
        }
        const user = yield userModel_1.default.findByIdAndUpdate(_id, updateData, { new: true });
        console.log({ user });
        if (!user)
            throw new Error('User Not Exist!');
        res.status(200).send({
            success: true,
            msg: 'Updated Successfully!',
            response: {
                user,
            },
        });
    }
    catch (err) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: 'Update Failed!',
            error: err.message || err,
        });
    }
});
exports.UpdateUser = UpdateUser;
