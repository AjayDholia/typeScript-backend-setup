const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var Users = require("../models/userModel")
import { Request, Response, NextFunction } from "express";
import { jwtConfig } from "../Mongo/Config";

var saltRounds = 12;
var Singup: any = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email } = req.body;
    try {
        const isUser = await Users.findOne({ email });
        if (isUser) throw "user Already registered!";

        const hash = await bcrypt.hash(password, saltRounds);

        const user = await Users.create(
            {
                ...req.body,
                password: hash,
            }

        );
        res.status(200).send({
            success: true,
            msg: "User Created Successfully!",
            response: {
                user: user,
            },
        });
    } catch (err) {
        console.log({ err })
        res.status(400).send({
            success: false,
            msg: "user Not Created!",
            err,

        });
    }
}
var loginUsers: any = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    try {
        let user = await Users
            .findOne({ email })
        console.log({ user })
        if (!user) throw "User Not Exist!";

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw "Wrong Password!";
        var token = jwt.sign(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                userType: user.userType,
                userStatus: user.userStatus,
                password: user.password

            },
            jwtConfig.JWT_PRIVATE_KEY
        );

        console.log({ user })
        res.status(200).send({
            success: true,
            msg: "Login Successfully!",
            response: {
              token,
              user: user,
            },
        });
    } catch (err: any) {
        console.log(err.toString())
        res.status(400).send({
            success: false,
            msg: "Login Failed!",
            error: err,
        });
    }
};

var getAllUsers: any = async (req: Request, res: Response, next: NextFunction) => {
    // const { user : any } = req;
    try {
        let user = await Users.find()
        console.log({user})

        if (!user) throw "User Not Exist!";

        res.status(200).send({
            success: true,
            msg: "Users Get Successfully!",
            response: {
                user: user,
            },
        });
    } catch (err: any) {
        console.log(err.toString())
        res.status(400).send({
            success: false,
            msg: "Users Get Failed!",
            error: err,
        });
    }
};

var UpdateUser: any = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { _id, newPassword } = req.body;
    try {
        let updateData = { ...req.body }; // Clone the request body
        if (newPassword) {
            const hash = await bcrypt.hash(newPassword, saltRounds);
            updateData.password = hash; // Add the hashed password to update data
        } else {
            delete updateData.password; // Ensure password isn't overwritten with an empty value
        }

        console.log({updateData})
        const user = await Users.findByIdAndUpdate(_id, updateData, { new: true })
        console.log({ user })

        if (!user) throw "User Not Exist!";

        res.status(200).send({
            success: true,
            msg: "Updated Successfully Successfully!",
            response: {
                user: user,
            },
        });
    } catch (err: any) {
        console.log(err.toString())
        res.status(400).send({
            success: false,
            msg: "updation Failed Failed!",
            error: err,
        });
    }
};


module.exports = {
    loginUsers,
    Singup,
    getAllUsers,
    UpdateUser
}