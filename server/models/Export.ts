import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  name: String,
  surname: String,
  road: String,
  work: String,
  contact: String,
  comments: Number,
  decisions: Number
})

export default model('Export', schema)