import Router from 'express'
import { registerUser, loginUser } from '../controller/userController'
const userRoute = Router()

userRoute.post('/login',loginUser)
userRoute.post('/register',registerUser)

export default userRoute 