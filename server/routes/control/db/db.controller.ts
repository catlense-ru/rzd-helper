import express, { Request, Response } from 'express'
import DB from './db.service'

const router = express.Router()

const db = new DB()

router.get('/transfer', async(req: Request, res: Response) => {
  res.json(await db.transfer())
})

router.get('/export', async(req: Request, res: Response) => {
  res.status(200).json(await db.dataExport())
})

export default router