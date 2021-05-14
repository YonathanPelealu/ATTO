"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptPwd = exports.encryptPwd = void 0;
const bcrypt = require('bcrypt');
const saltRound = Number(process.env.SALT_ROUND);
const encryptPwd = (password) => bcrypt.hashSync(password, saltRound);
exports.encryptPwd = encryptPwd;
const decryptPwd = (password, dbPassword) => bcrypt.compareSync(password, dbPassword);
exports.decryptPwd = decryptPwd;
