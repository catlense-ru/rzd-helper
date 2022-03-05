import 'dotenv/config'
import express, { Response } from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/rzd-helper').then(() => console.log('MongoDB Connected'))

const app = express()

app.all('/', (_, res: Response) => {
  res.send('<center><h1>403 Forbidden</h1><hr/><span>rzd</span></center>')
})

app.listen(process.env.PORT, () => console.log(`Server has been started ${process.env.PORT}`))