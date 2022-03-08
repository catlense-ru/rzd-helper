import express from 'express'
import DBController from './db/db.controller'
import SystemsController from './systems/systems.controller'
import CommentsController from './comments/comments.controller'
import DecisionsController from './decisions/decision.controller'

const router = express.Router()

router.use('/db', DBController)
router.use('/systems', SystemsController)
router.use('/comments', CommentsController)
router.use('/decisions', DecisionsController)

export default router