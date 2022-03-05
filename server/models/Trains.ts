import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  name: String
})

export default model('Train', schema)