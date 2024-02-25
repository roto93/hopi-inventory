import { Schema, model } from "mongoose";

const costSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, min: 0, required: true },
  image: { type: String },
  hostEventID: { type: Schema.ObjectId, required: true, ref: 'Event' },
  totalPrice: { type: Number, min: 0, required: true },
  categoryID: { type: Schema.ObjectId, ref: 'Category' }
})

export default model('Cost', costSchema)