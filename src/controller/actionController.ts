import {Request, Response} from 'express'
import {QueryResult} from 'pg'
import { pool } from '../database/database'
import { v4 } from 'uuid'

export const getActionByBoard = async (req:Request,res:Response): Promise<Response> => {
    const { board } = req.params
    const {userId} = req.headers
    try {
        const response : QueryResult = await pool.query(`SELECT * FROM actions WHERE actions.board = $1 AND actions.userid = $2`,[board,userId])
        return res.status(200).json(response.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}
export const createActionByBoard = async (req:Request,res:Response): Promise<Response> => {
    const { task,board } = req.body
    const {userId} = req.headers
    
    const boardId = v4()
    try {
        const response : QueryResult = await pool.query(`INSERT INTO actions (userid,task,board,id) VALUES ($1,$2,$3,$4)`,[userId,task,board,boardId])
        return res.status(201).json({
            status : 201,
            data:{
                message: `new task added on board ${board}`        
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}
export const updateActionByActionId = async (req:Request,res:Response): Promise<Response> => {
    const { board, taskId } = req.params
    const {userId} = req.headers
    try {
        const response : QueryResult = await pool.query(`UPDATE actions SET board = $1 WHERE userId = $2 AND id = $3`,[board,userId,taskId])
        return res.status(200).json({
            status : 200,
            message: `task has been moved to ${board}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}
export const deleteActionByActionId = async (req:Request,res:Response): Promise<Response> => {
    const { taskId } = req.params
    const {userId} = req.headers
    try {
        const response : QueryResult = await pool.query(`DELETE FROM actions WHERE id = $1 AND userid = $2`,[taskId,userId])
        return res.status(200).json({
            status : 200,
            message: `task has been removed from board`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}