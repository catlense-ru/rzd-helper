import express, { Request, Response } from 'express'
import SearchController from './search/search.controller'

const router = express.Router()

router.use('/search', SearchController)

export default router