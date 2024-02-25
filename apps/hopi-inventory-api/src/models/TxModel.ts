import { Schema, model } from "mongoose"

const Order = new Schema({
  productID: String,
  quantity: Number
})

const txSchema = new Schema({
  time: { type: Date, require: true },
  hostEventID: { type: Schema.ObjectId, require: true, ref: 'Event' },
  orders: [{ type: Order, require: true }],
}, { timestamps: true })

export default model('Tx', txSchema)