import { Schema, model } from "mongoose";

const costSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, min: 0, required: true },
  image: { type: String },
  hostEventID: { type: Schema.ObjectId, require: true, ref: 'Event' },
})

export default model('Cost', costSchema)