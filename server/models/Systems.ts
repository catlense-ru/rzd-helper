import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  name: String,
  by: Number
})

export default model('System', schema)