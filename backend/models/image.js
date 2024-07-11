import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
   image:String
  });
export const Image = mongoose.model('Image', imageSchema);

