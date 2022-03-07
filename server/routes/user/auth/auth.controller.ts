import express, { Request, Response } from 'express'
import Auth from './auth.service'

const router = express.Router()
const auth = new Auth()

router.post('/registration', async(req: Request, res: Response) => {
  const {name, surname, login, work, password, contact, road} = req.body
  const user = await auth.registration(name, surname, login, work, password, contact, road)
  res.status(201).json(user)
})

router.post('/login', async(req: Request, res: Response) => {
  const {login, password} = req.body
  const user = await auth.login(login, password)
  res.status(200).json(user)
})

export default router