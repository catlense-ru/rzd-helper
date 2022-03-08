import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  name: String,
  by: Number,
  by_name: String
})

export default model('System', schema)