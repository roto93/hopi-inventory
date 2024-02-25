import { Schema, model } from "mongoose"

const categoryModel = new Schema({
  name: { type: String, required: true },
  hostEventID: { type: Schema.ObjectId, required: true, ref: 'Event' }
})

export default model('Category', categoryModel)