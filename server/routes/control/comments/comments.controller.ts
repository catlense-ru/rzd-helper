import express, {Request, Response} from 'express'
import Comments from './comments.service'

const router = express.Router()
const comments = new Comments()

router.get('/getAll', async(_: Request, res: Response) => {
  res.status(200).json(await comments.getAll())
})

router.get('/getById', async(req: Request, res: Response) => {
  res.status(200).json(await comments.getById(req.query.id?.toString()))
})

router.get('/getBySystem', async(req: Request, res: Response) => {
  res.status(200).json(await comments.getBySystem(req.query.id?.toString()))
})

router.post('/create', async(req: Request, res: Response) => {
  const {comment, system_id, by, by_name, train} = req.body
  if(await comments.isExistsByName(comment)) {
    return res.status(500).json({status: 'error', message: 'Такое замечание уже существует'})
  } else {
    await comments.create(comment, system_id, by, by_name, train)
    return res.status(201).json({status: 'success', message: 'Успешно создано'})
  }
})

router.post('/edit', async(req: Request, res: Response) => {
  return res.status(200).json(await comments.edit(req.body.comment_id, req.body.comment))
})

export default router