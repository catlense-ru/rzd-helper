import express, { Request, Response } from 'express'
import DBController from './db/db.controller'
import SystemsController from './systems/systems.controller'
import CommentsController from './comments/comments.controller'
import DecisionsController from './decisions/decision.controller'
import TrainController from './trains/trains.controller'
import StatController from './stat/stat.controller'

const router = express.Router()

router.use('/db', DBController)
router.use('/systems', SystemsController)
router.use('/trains', TrainController)
router.use('/comments', CommentsController)
router.use('/decisions', DecisionsController)
router.use('/stat', StatController)

export default router