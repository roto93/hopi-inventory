import { Schema, model } from "mongoose"

const categoryModel = new Schema({
  name: { type: String, require: true },
  hostEventID: { type: Schema.ObjectId, require: true, ref: 'Event' },
  costIDs: [{ type: Schema.ObjectId, ref: "Cost" }],
  productIDs: [{ type: Schema.ObjectId, ref: "Product" }],
})

export default model('Category', categoryModel)