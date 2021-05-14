"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const userRoute = express_1.default();
userRoute.post('/login', userController_1.loginUser);
userRoute.post('/register', userController_1.registerUser);
exports.default = userRoute;
