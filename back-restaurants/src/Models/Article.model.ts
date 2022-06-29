import { ObjectId } from "mongodb";
import mongoose, { Schema, Document, Types } from "mongoose"

export interface ArticleInput {
    restaurantId: ObjectId;
    articleCategory: Types.ObjectId;
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
  articleCategory: {
    type: mongoose.Schema.Types.ObjectId, ref: 'articleCategory'
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'restaurant'
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