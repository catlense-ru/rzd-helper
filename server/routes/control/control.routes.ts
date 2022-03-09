import express, { Request, Response } from 'express'
import DBController from './db/db.controller'
import SystemsController from './systems/systems.controller'
import CommentsController from './comments/comments.controller'
import DecisionsController from './decisions/decision.controller'

import fs from 'fs'
import path from 'path'
import json2csv from 'json2csv'
// @ts-ignore
import convertCsvToXlsx from '@aternus/csv-to-xlsx'
import Export from '../../models/Export'
import Decision from '../../models/Decision'
import Comment from '../../models/Comment'
import mongoose from 'mongoose'

const router = express.Router()

router.use('/db', DBController)
router.use('/systems', SystemsController)
router.use('/comments', CommentsController)
router.use('/decisions', DecisionsController)

export default router