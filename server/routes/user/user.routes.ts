import express, { Request, Response } from 'express'
import AuthController from './auth/auth.controller'
import User from '../../models/User'

const router = express.Router()

router.use('/auth', AuthController)

router.get('/get', async(req: Request, res: Response) => {
  const {token} = req.query

  const user = await User.findOne({token})

  if(!user) {
    return res.status(200).json({status: 500, message: 'Пользователь не найден'})
  }

  res.status(200).json(user)

})

export default router