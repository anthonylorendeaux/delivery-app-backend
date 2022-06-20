import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface DeliveryInput {
    vehicle: String;
    rating: Number;
    Available: Boolean;
}

export interface DeliveryDocument extends DeliveryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const DeliverySchema: Schema = new Schema({
  vehicle: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  Available: {
    type: Boolean,
    required: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model<DeliveryDocument>("delivery", DeliverySchema)