import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface ArticleCategoryInput {
    name: String;
}

export interface ArticleCategoryDocument extends ArticleCategoryInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ArticleCategorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model<ArticleCategoryDocument>("articleCategory", ArticleCategorySchema)