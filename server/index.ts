import 'dotenv/config'
import express, { Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import AuthController from './routes/user/auth/auth.controller'

mongoose.connect('mongodb://127.0.0.1:27017/rzd-helper').then(() => console.log('MongoDB Connected'))

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((_, __, next) => {
  const time = `${new Date(Date.now()).toLocaleDateString()} ${new Date(Date.now()).toLocaleTimeString()}`
  console.log(`[${time}] user joined`)
  next()
})

app.use('/user/auth', AuthController)

app.all('/', (_, res: Response) => {
  res.send('<center><h1>403 Forbidden</h1><hr/><span>rzd</span></center>')
})

app.listen(process.env.PORT, () => console.log(`Server has been started ${process.env.PORT}`))