import { encryptPwd, decryptPwd } from '../helpers/password'
import { generateToken, verifyToken } from '../helpers/jsonwebtoken'
import { pool } from '../database/database'
import { QueryResult} from 'pg'
import { NextFunction, Request, Response} from 'express'
import { v4 } from 'uuid'
import _ from 'lodash'

export const registerUser = async (req:Request,res:Response): Promise<Response> => {
    const { name,email,password} = req.body
    try {
        const user:QueryResult = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
        
        if (!_.isEmpty(user.rows)) return res.status(400).json({message:'user already exist'});
        const encryptPassword = encryptPwd(password)
        const id = v4()
        await pool.query('INSERT INTO users (name,email,password,id) VALUES ($1,$2,$3,$4)',[name,email,encryptPassword,id])
        return res.status(201).json({message: 'registration complete'})
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}

export const loginUser = async (req:Request,res:Response) : Promise<Response> => {
    const { email, password } = req.body
    try {
        const user:QueryResult = await pool.query(`SELECT * FROM users WHERE email = $1`,[email])
        if(_.isEmpty(user.rows)) return res.status(400).json({message: 'email not registered'})
        if(!decryptPwd(password,user.rows[0].password)) return res.status(403).json('invalid password')
        const token = await generateToken(res,{userId: user.rows[0].id},{expiresIn:'1h'})
        return res.status(200).json({
            data : {
                name : user.rows[0].name,
                email : user.rows[0].email,
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}

export const tokenVerifier = async (req:Request,res:Response,next:NextFunction) => {
    const { token } = req.cookies
    const { userId } = await verifyToken(token)
    try {
        if(!userId) return res.status(403).json('invalid token')
        const user:QueryResult = await pool.query(`SELECT * FROM users WHERE id = $1`,[userId])
        if(_.isEmpty(user)) return res.status(404).json('user not found')
        req.headers['userId'] = userId
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json('Internal Server Error')
    }
}