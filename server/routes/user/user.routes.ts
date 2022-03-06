import express from 'express'
import AuthController from './auth/auth.controller'
const router = express.Router()

router.use('/auth', AuthController)

export default router