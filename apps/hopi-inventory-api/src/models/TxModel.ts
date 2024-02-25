import { Schema, model } from "mongoose"

const Order = new Schema({
  productID: String,
  quantity: Number
})

const txSchema = new Schema({
  time: { type: Date, required: true },
  hostEventID: { type: Schema.ObjectId, required: true, ref: 'Event' },
  orders: [{ type: Order, required: true }],
}, { timestamps: true })

export default model('Tx', txSchema)