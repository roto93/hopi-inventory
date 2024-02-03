import { Schema, model } from "mongoose";

const productSchema = new Schema({
  categoryID: { type: Schema.ObjectId, require: true, ref: 'Category' },
  name: { type: String, require: true },
  inventory: { type: Number, min: 0, require: true },
  soldQuantity: { type: Number, min: 0, require: true },
  price: { type: Number, min: 0, require: true },
  image: { type: String }
})

export default model('Product', productSchema)