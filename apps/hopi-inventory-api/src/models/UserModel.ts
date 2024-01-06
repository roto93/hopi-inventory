import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  avatar: { type: String },
}, { timestamps: true })

export default model('User', userSchema)