import { Schema, model } from "mongoose"

const categoryModel = new Schema({
  name: { type: String, required: true },
  hostEventID: { type: Schema.ObjectId, required: true, ref: 'Event' },
  costIDs: [{ type: Schema.ObjectId, ref: "Cost" }],
  productIDs: [{ type: Schema.ObjectId, ref: "Product" }],
})

export default model('Category', categoryModel)