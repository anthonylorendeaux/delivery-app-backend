import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface RestaurantCategoryInput {
    name: String;
}

export interface RestaurantCategoryDocument extends RestaurantCategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const RestaurantCategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model<RestaurantCategoryDocument>("restaurantCategory", RestaurantCategorySchema)