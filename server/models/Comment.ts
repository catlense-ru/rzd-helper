import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  comment: String,
  system_id: Number,
  by: Number,
  by_name: String,
  train: String
})

export default model('Comment', schema)