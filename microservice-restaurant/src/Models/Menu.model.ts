import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface MenuInput {
    articleIds: Array<ObjectId>;
    total: string;
    restaurantId: string;
}

export interface MenuDocument extends MenuInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const MenuSchema: Schema = new Schema({
  articlesId: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'article'}],
  },
  total: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'restaurant'},
  },
},
{
  timestamps: true,
});

export default mongoose.model<MenuDocument>("menu", MenuSchema)