import express, {Request, Response} from 'express'
import Stat from './stat.service'

const router = express.Router()
const stat = new Stat()

router.get('/users', async(req: Request, res: Response) => {
  res.status(200).json(await stat.getUsers())
})

export default router