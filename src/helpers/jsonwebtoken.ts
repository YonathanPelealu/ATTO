import { response } from "express"

require("dotenv").config()
const jwt = require("jsonwebtoken")

const { JWT_SECRET } = process.env
/**
 * @param {Object} data
 * @returns {string}
 */
export const generateToken = (data:any,opt:any) => {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" })
  return  token
}

/**
 * @param {string} token - token from login
 * @returns {Object}
 */
export const verifyToken = (token:any) => {
  const data = jwt.verify(token, JWT_SECRET)
  return data
}
