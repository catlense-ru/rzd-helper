import {Schema, model} from 'mongoose'

const schema = new Schema({
  comment: String,
  decision: String,
  by_comment: String,
  by_decision: String
})

export default model('Export', schema)