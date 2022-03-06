import 'dotenv/config'
import express, { Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import UserController from './routes/user/user.routes'

mongoose.connect('mongodb://127.0.0.1:27017/rzd-helper').then(() => console.log('MongoDB Connected'))

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use((_, __, next) => {
  next()
})

app.use('/user', UserController)

app.all('/', (_, res: Response) => {
  res.send('<center><h1>403 Forbidden</h1><hr/><span>rzd</span></center>')
})

app.listen(process.env.PORT, () => console.log(`Server has been started ${process.env.PORT}`))