import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface OrderInput {
    articles: Array<object>;
    menus: Array<object>;
    status: string;
    discount: Boolean;
    customerId: Number;
    restaurantId: ObjectId;
}

export interface OrderDocument extends OrderInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema = new Schema({
  articles: {
    type: [{}],
    required: true,
  },
  menus: {
    type: [{}],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'preparating','delivering','delivered'],
    required: true,
  },
  discount: {
    type: Boolean,
    required: true,
  },
  restaurantId: {
    type: ObjectId,
    required: true,
  },
  customerId: {
    type: Number,
    required: true,
  },
  deliveryId: {
    type: ObjectId,
  }
},
{
  timestamps: true,
});

export default mongoose.model<OrderDocument>("order", OrderSchema)