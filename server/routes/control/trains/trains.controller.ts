import express, { Request, Response } from 'express'
import Train from './trains.service'

const router = express.Router()

const trains = new Train()

router.get('/getAll', async(_: Request, res: Response) => {
  res.status(200).json(await trains.getAll())
})

router.get('/get', async(req: Request, res: Response) => {
  res.status(200).json(await trains.get(req.query.id?.toString()))
})

router.post('/create', async(req: Request, res: Response) => {
  const {name} = req.body
  if(await trains.isExistsByName(name)) {
    return res.status(200).json({status: 'error', message: 'Такая система уже существует'})
  } else {
    await trains.create(name)
    return res.status(201).json({status: 'success', message: 'Успешно создано'})
  }
})

export default router