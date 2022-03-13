import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  comment_id: Number,
  decision: String,
  by: Number,
  by_name: String,
  photo: String,
  likes: [String]
})

export default model('Decision', schema)