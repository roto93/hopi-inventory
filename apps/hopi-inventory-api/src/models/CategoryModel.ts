import { Schema, model } from "mongoose"

const categoryModel = new Schema({
  name: { type: String, require: true },
  costIDs: [{ type: Schema.ObjectId, ref: "Cost" }],
  productIDs: [{ type: Schema.ObjectId, ref: "Product" }],
})

export default model('Category', categoryModel)