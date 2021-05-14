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
exports.deleteActionByActionId = exports.updateActionByActionId = exports.createActionByBoard = exports.getActionByBoard = void 0;
const database_1 = require("../database/database");
const uuidv4_1 = require("uuidv4");
const getActionByBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board } = req.params;
    const { userId } = req.headers;
    console.log(board, userId);
    try {
        const response = yield database_1.pool.query(`SELECT * FROM actions WHERE actions.board = $1 AND actions.userid = $2`, [board, userId]);
        return res.status(201).json(response.rows);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.getActionByBoard = getActionByBoard;
const createActionByBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { task, board } = req.body;
    const { userId } = req.headers;
    const boardId = uuidv4_1.uuid();
    try {
        const response = yield database_1.pool.query(`INSERT INTO actions (userid,task,board,id) VALUES ($1,$2,$3,$4)`, [userId, task, board, boardId]);
        return res.status(201).json({
            status: 201,
            data: {
                message: `new task added on board ${board}`
            }
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.createActionByBoard = createActionByBoard;
const updateActionByActionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { board, taskId } = req.params;
    const { userId } = req.headers;
    try {
        const response = yield database_1.pool.query(`UPDATE actions SET board = $1 WHERE userId = $2 AND id = $3`, [board, userId, taskId]);
        return res.status(200).json({
            status: 200,
            message: `task has been moved to ${board}`
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.updateActionByActionId = updateActionByActionId;
const deleteActionByActionId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { userId } = req.headers;
    try {
        const response = yield database_1.pool.query(`DELETE FROM actions WHERE id = $1 AND userid = $2`, [taskId, userId]);
        return res.status(200).json({
            status: 200,
            message: `task has been removed from board`
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json('Internal Server Error');
    }
});
exports.deleteActionByActionId = deleteActionByActionId;
