import { Schema, model } from "mongoose"

const eventModel = new Schema({
  name: { type: String, require: true },
  userIDs: [{ type: Schema.ObjectId, ref: 'User', require: true }],
  categoryIDs: [{ type: Schema.ObjectId, ref: 'Category' }],
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  image: { type: String }
})

export default model('Event', eventModel)