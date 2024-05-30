import mongoose, { Schema, Model } from "mongoose";
import { ISubcategory } from "../interfaces/ISubcategory";
import { ICategory } from "../interfaces/ICategory";

const subcategorySchema: Schema<ISubcategory> = new Schema({
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
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
}, { timestamps: true });

const Subcategory: Model<ISubcategory> = mongoose.model<ISubcategory>("Subcategory", subcategorySchema);

export default Subcategory;
