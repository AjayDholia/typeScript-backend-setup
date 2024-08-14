"use strict";
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
exports.DeleteUser = exports.UpdateUser = exports.getAllUsers = exports.Singup = exports.loginUsers = void 0;
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
const DeleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.body;
    try {
        const user = yield userModel_1.default.findByIdAndDelete(_id);
        console.log({ user });
        if (!user)
            throw new Error('User Not Exist!');
        res.status(200).send({
            success: true,
            msg: 'Deleted Successfully!',
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
exports.DeleteUser = DeleteUser;
