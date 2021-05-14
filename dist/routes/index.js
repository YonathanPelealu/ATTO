"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const action_1 = __importDefault(require("./action"));
const auth_1 = __importDefault(require("./auth"));
const router = express_1.Router();
router.use('/action', action_1.default);
router.use('', auth_1.default);
exports.default = router;
