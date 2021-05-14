import Router from 'express'
const actionRoute = Router()
import { deleteActionByActionId,getActionByBoard,createActionByBoard,updateActionByActionId} from '../controller/actionController'
import { tokenVerifier } from '../controller/userController'

actionRoute.get('/:board', tokenVerifier,getActionByBoard)
actionRoute.put('/:board/:taskId',tokenVerifier,updateActionByActionId)
actionRoute.delete('/:taskId',tokenVerifier,deleteActionByActionId)
actionRoute.post('',tokenVerifier,createActionByBoard)

export default actionRoute 