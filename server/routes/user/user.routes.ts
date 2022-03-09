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

router.get('/g_a', async(req: Request, res: Response) => {
  res.status(200).json(await User.find({}))
})

router.get('/s_p', async(req: Request, res: Response) => {
  const {uid, perms} = req.query;

  const user = await User.findOne({uid})
  if(!user) return res.status(500).json("...");
  user.permissions = perms
  await user.save()
  res.status(200).json("OK")
})

export default router