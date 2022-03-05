import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  date: String,
  count: Number,
  ip: String
})

export default model('stat_today', schema)