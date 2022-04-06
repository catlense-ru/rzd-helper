import express, { Request, Response } from 'express'
import Search from './search.service'

const router = express.Router()
const search = new Search()

router.get('/', async(req: Request, res: Response) => {
  const text: any = req.query.s
  res.status(200).json(await search.search(text))
})

export default router