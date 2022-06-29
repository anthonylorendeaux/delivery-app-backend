import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface OrderInput {
    articles: Array<string>;
    menus: Array<string>;
    status: Array<string>;
    discount: Boolean;
    customerId: Number;
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  articles: {
    type: [Array],
    required: true,
  },
  menus: {
    type: [Array],
    required: true,
  },
  status: {
    type: [String],
    enum: ['pending', 'accepted', 'rejected', 'preparating','delivering','delivered'],
    required: true,
  },
  discount: {
    type: Boolean,
    required: true,
  },
  customerId: {
    type: Number,
    required: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model<OrderDocument>("order", OrderSchema)