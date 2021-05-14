"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const actionRoute = express_1.default();
const actionController_1 = require("../controller/actionController");
const userController_1 = require("../controller/userController");
actionRoute.get('/:board', userController_1.tokenVerifier, actionController_1.getActionByBoard);
actionRoute.put('/:board/:taskId', userController_1.tokenVerifier, actionController_1.updateActionByActionId);
actionRoute.delete('/:taskId', userController_1.tokenVerifier, actionController_1.deleteActionByActionId);
actionRoute.post('', userController_1.tokenVerifier, actionController_1.createActionByBoard);
exports.default = actionRoute;
