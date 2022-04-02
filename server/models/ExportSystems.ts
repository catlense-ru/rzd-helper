import {Schema, model} from 'mongoose'

const schema = new Schema({
  uid: Number,
  name: String,
  road: String,
  work: String,
  systems: [Object]
})

export default model('ExportSystems', schema)