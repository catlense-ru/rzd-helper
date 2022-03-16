import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  by_decision: String,
  by_comment: String,
  system: String,
  comment: String,
  decision: String,
  likes: Number
})

export default model('ExportDecisions', schema)