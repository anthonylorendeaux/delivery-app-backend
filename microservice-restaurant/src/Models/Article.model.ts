import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface ArticleInput {
    restaurantId: ObjectId;
    categoryId: ObjectId;
    name: String;
    description: String;
    picture: String;
    price: String; 
}

export interface ArticleDocument extends ArticleInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema({
  restaurantId: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'restaurant'},
  },
  categoryId: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'articleCategory'},
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model<ArticleDocument>("article", ArticleSchema)