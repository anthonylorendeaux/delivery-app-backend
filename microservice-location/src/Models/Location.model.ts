import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"

export interface LocationInput {
    location: String;
}

export interface LocationDocument extends LocationInput, mongoose.Document {
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema: Schema = new Schema({
  location: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
});

export default mongoose.model<LocationDocument>("location", LocationSchema)