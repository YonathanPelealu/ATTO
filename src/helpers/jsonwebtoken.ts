require("dotenv").config()
const jwt = require("jsonwebtoken")

const { JWT_SECRET } = process.env
/**
 * @param {Object} data
 * @returns {string}
 */
export const generateToken = (res:any,data:any,opt:any) => {
  const token = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" })
  return  res.cookie ("token",token,
  {
    httpOnly: true,
    maxAge: 1000 * 60 ** 2,
    sameSite: true,
  })
}

/**
 * @param {string} token - token from login
 * @returns {Object}
 */
export const verifyToken = (token:any) => {
  const data = jwt.verify(token, JWT_SECRET)
  return data
}
