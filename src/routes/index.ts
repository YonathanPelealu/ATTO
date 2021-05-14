import {Router} from 'express'
import actionRoute from './action'
import userRoute from './auth'
const router = Router()

router.use('/action',actionRoute)
router.use('',userRoute)

export default router