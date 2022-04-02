import 'dotenv/config'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import multer from 'multer'
import fs from 'fs'

import UserController from './routes/user/user.routes'
import ControlController from './routes/control/control.routes'

mongoose.connect('mongodb://127.0.0.1:27017/rzd-helper').then(() => console.log('MongoDB Connected'))

const app = express()

const imageUpload = multer({
  storage: multer.diskStorage(
    {
      destination: function (req, file, cb) {
        cb(null, 'images/');
      },
      filename: function (req, file, cb) {
        cb(
          null,
          new Date().valueOf() +
          '_' +
          file.originalname
        );
      }
    }
  ),
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/images', express.static(path.join(__dirname, '../', 'images')))
app.use((_, __, next) => {
  next()
})
app.use((_, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use('/user', UserController)
app.use('/control', ControlController)

if (!fs.existsSync(path.join(__dirname, 'images'))) {
  fs.promises.mkdir(path.join(__dirname, 'images'))
}

app.all('/', (_, res: Response) => {
  res.send('<center><h1>403 Forbidden</h1><hr/><span>rzd</span></center>')
})

app.post('/upload', imageUpload.single('photo'), (req: Request, res: Response) => {
  const file:any = req.file
  res.json({response: file.path})
})

app.get('/images/:filename', (req: Request, res: Response) => {
  const { filename } = req.params
  return res.sendFile(path.join(__dirname, '../', 'images', filename))
})

app.listen(process.env.PORT, () => console.log(`Server has been started ${process.env.PORT}`))