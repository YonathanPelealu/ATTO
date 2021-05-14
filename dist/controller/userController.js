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
exports.tokenVerifier = exports.loginUser = exports.registerUser = void 0;
const password_1 = require("../helpers/password");
const jsonwebtoken_1 = require("../helpers/jsonwebtoken");
const database_1 = require("../database/database");
const uuidv4_1 = require("uuidv4");
const lodash_1 = __importDefault(require("lodash"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        const user = yield database_1.pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (!lodash_1.default.isEmpty(user))
            return res.status(400).json({ message: 'user already exist' });
        const encryptPassword = password_1.encryptPwd(password);
        const id = uuidv4_1.uuid();
        yield database_1.pool.query('INSERT INTO users (name,email,password,id) VALUES ($1,$2,$3,$4)', [name, email, encryptPassword, id]);
        return res.status(201).json({ message: 'registration complete' });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield database_1.pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
        if (lodash_1.default.isEmpty(user))
            return res.status(400).json({ message: 'email not registered' });
        if (!password_1.decryptPwd(password, user.rows[0].password))
            return res.status(400).json('invalid password');
        const token = jsonwebtoken_1.generateToken({ userId: user.rows[0].id }, { expiresIn: '1h' });
        return res.status(201).json({
            data: {
                name: user.rows[0].name,
                email: user.rows[0].email,
                token
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.loginUser = loginUser;
const tokenVerifier = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    const { userId } = jsonwebtoken_1.verifyToken(token);
    try {
        if (!userId)
            return res.status(403).json('invalid token');
        const user = yield database_1.pool.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        if (lodash_1.default.isEmpty(user))
            return res.status(404).json('user not found');
        req.headers['userId'] = userId;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.tokenVerifier = tokenVerifier;
