import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  name: String,
  surname: String,
  login: String,
  work: String,
  password: String,
  permissions: Number,
  contact: String,
  token: String,
  stat: [Object]
})

export default model('User', schema)