import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface RestaurantInput {
  name: String;
  description: String;
  categoryId: ObjectId;
  picture: String;
  rating: Number;
  workDays: Array<String>;
  workHours: Array<String>;
  menuIds: Array<ObjectId>[];
  articleIds: Array<ObjectId>[];
}

export interface RestaurantDocument extends RestaurantInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const RestaurantSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'restaurantCategory'},
  },
  picture: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  workDays: {
    type: Array<String>,
    required: true,
  },
  workHours: {
    type: Array<String>,
    required: true,
  },
  menuIds: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'menu'}],
  },
  articleIds: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'article'}],
  },
},
{
  timestamps: true,
});

export default mongoose.model<RestaurantDocument>("restaurant", RestaurantSchema)