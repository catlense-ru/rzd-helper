import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/rzd-helper').then(() => console.log('MongoDB Connected'))

const app = express()



app.listen(process.env.PORT, () => console.log(`Server has been started ${process.env.PORT}`))