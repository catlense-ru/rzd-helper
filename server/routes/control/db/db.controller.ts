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

router.get('/exportdecisions', async(req: Request, res: Response) => {
  res.status(200).json(await db.exportDecisions())
})

router.get('/exportsystems', async(req: Request, res: Response) => {
  res.status(200).json(await db.getSystems())
})

setInterval(async() => {
  if(new Date().getHours() === 7 && new Date().getMinutes() === 30) {
    await db.dataExport()
  }
}, 60000)

export default router