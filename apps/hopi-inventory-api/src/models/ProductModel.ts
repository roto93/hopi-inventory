import { Schema, model } from "mongoose";

const productSchema = new Schema({
  categoryID: { type: Schema.ObjectId, ref: 'Category' },
  name: { type: String, required: true },
  inventory: { type: Number, min: 0, required: true },
  soldQuantity: { type: Number, min: 0, required: true },
  price: { type: Number, min: 0, required: true },
  image: { type: String },
  hostEventID: { type: Schema.ObjectId, required: true, ref: 'Event' },
})

export default model('Product', productSchema)