import mongoose, { Schema, Model } from "mongoose";
import { ICategory } from "../interfaces/ICategory";

const categorySchema: Schema<ICategory> = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

const Category: Model<ICategory> = mongoose.model<ICategory>("Category", categorySchema);

export default Category;


