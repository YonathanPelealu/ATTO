"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
/**
 * @param {Object} data
 * @returns {string}
 */
const generateToken = (data, opt) => {
    const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    return token;
};
exports.generateToken = generateToken;
/**
 * @param {string} token - token from login
 * @returns {Object}
 */
const verifyToken = (token) => {
    const data = jwt.verify(token, JWT_SECRET);
    return data;
};
exports.verifyToken = verifyToken;
