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
exports.validator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Config_1 = require("../Mongo/Config");
const validator = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization || '';
        const token = authorization.split(' ')[1];
        if (!token) {
            res.status(401).send({ success: false, msg: 'No token provided!' });
            return;
        }
        // Verify the token
        const verifiedData = jsonwebtoken_1.default.verify(token, Config_1.jwtConfig.JWT_PRIVATE_KEY);
        req.user = verifiedData;
        next();
    }
    catch (err) {
        res.status(400).send({ success: false, msg: 'Not Verified!', error: err.message || err });
    }
});
exports.validator = validator;
