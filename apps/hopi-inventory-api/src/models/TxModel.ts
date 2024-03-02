import { Schema, model } from "mongoose"

export const Order = new Schema({
  productID: { type: String, required: true },
  quantity: { type: Number, min: 0, required: true }
})

const txSchema = new Schema({
  // time: { type: Date, required: true },
  hostEventID: { type: Schema.ObjectId, required: true, ref: 'Event' },
  orders: [{ type: Order, required: true }],
}, { timestamps: true })

export default model('Transaction', txSchema)