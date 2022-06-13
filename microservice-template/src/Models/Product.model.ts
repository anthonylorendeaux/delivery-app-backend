import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"
import { IProduct } from "../types/product"

export interface ProductInput {
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocument extends ProductInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  created_at: 
    { 
      type: Date, 
      required: true, 
      default: Date.now 
    },
  updated_at: 
    {
      type: Date, 
      required: true, 
      default: Date.now 
    }
},
{
  timestamps: true,
});

export default mongoose.model<ProductDocument>("Product", ProductSchema)