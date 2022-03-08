import express from 'express'
import DBController from './db/db.controller'

const router = express.Router()

router.use('/db', DBController)

export default router