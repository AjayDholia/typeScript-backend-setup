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
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Users = require("../models/userModel");
const Config_1 = require("../Mongo/Config");
var saltRounds = 12;
var Singup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const isUser = yield Users.findOne({ email });
        if (isUser)
            throw "user Already registered!";
        const hash = yield bcrypt.hash(password, saltRounds);
        const user = yield Users.create(Object.assign(Object.assign({}, req.body), { password: hash }));
        res.status(200).send({
            success: true,
            msg: "User Created Successfully!",
            response: {
                user: user,
            },
        });
    }
    catch (err) {
        console.log({ err });
        res.status(400).send({
            success: false,
            msg: "user Not Created!",
            err,
        });
    }
});
var loginUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield Users
            .findOne({ email });
        console.log({ user });
        if (!user)
            throw "User Not Exist!";
        const match = yield bcrypt.compare(password, user.password);
        if (!match)
            throw "Wrong Password!";
        var token = jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            password: user.password
        }, Config_1.jwtConfig.JWT_PRIVATE_KEY);
        console.log({ user });
        res.status(200).send({
            success: true,
            msg: "Login Successfully!",
            response: {
                token,
                user: user,
            },
        });
    }
    catch (err) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: "Login Failed!",
            error: err,
        });
    }
});
var getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { user : any } = req;
    try {
        let user = yield Users.find();
        console.log({ user });
        if (!user)
            throw "User Not Exist!";
        res.status(200).send({
            success: true,
            msg: "Users Get Successfully!",
            response: {
                user: user,
            },
        });
    }
    catch (err) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: "Users Get Failed!",
            error: err,
        });
    }
});
var UpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, newPassword } = req.body;
    try {
        let updateData = Object.assign({}, req.body); // Clone the request body
        if (newPassword) {
            const hash = yield bcrypt.hash(newPassword, saltRounds);
            updateData.password = hash; // Add the hashed password to update data
        }
        else {
            delete updateData.password; // Ensure password isn't overwritten with an empty value
        }
        console.log({ updateData });
        const user = yield Users.findByIdAndUpdate(_id, updateData, { new: true });
        console.log({ user });
        if (!user)
            throw "User Not Exist!";
        res.status(200).send({
            success: true,
            msg: "Updated Successfully Successfully!",
            response: {
                user: user,
            },
        });
    }
    catch (err) {
        console.log(err.toString());
        res.status(400).send({
            success: false,
            msg: "updation Failed Failed!",
            error: err,
        });
    }
});
module.exports = {
    loginUsers,
    Singup,
    getAllUsers,
    UpdateUser
};
