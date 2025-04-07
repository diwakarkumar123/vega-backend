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
const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
const user = require("../models/UserSection");
exports.userAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_KEY);
        console.log(decoded, 'decodeddecoded');
        let userData = yield user.findOne({
            where: { email: decoded.email }
        });
        userData = JSON.parse(JSON.stringify(userData));
        if (!userData) {
            console.log("Token expired!", "unAuthorized");
            // logger.error(error);
        }
        req.userData = userData;
        next();
    }
    catch (error) {
        // logger.error(error);
        console.log(error);
        return next(error);
    }
});
