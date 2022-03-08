import express, {Request, Response} from 'express'
import Decisions from './decision.service'

const router = express.Router()
const decisions = new Decisions()

router.get('/getAll', async(_: Request, res: Response) => {
  res.status(200).json(await decisions.getAll())
})

router.get('/getById', async(req: Request, res: Response) => {
  res.status(200).json(await decisions.getById(req.query.id?.toString()))
})

router.get('/getByComment', async(req: Request, res: Response) => {
  res.status(200).json(await decisions.getByComment(req.query.id?.toString()))
})

router.post('/create', async(req: Request, res: Response) => {
  const {comment_id, decision, by, by_name} = req.body
  if(await decisions.isExistsByName(decision)) {
    return res.status(500).json({status: 'error', message: 'Решение уже существует'})
  } else {
    await decisions.create(comment_id, decision, by, by_name)
    res.status(201).json({status: 'success', message: 'Решение добавлено'})
  }
})

router.post('/edit', async(req: Request, res: Response) => {
  return res.status(200).json(await decisions.edit(req.body.decision_id, req.body.decision))
})

export default router