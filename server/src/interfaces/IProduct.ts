import { Document, ObjectId } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: ObjectId;
  subcategory: ObjectId;
  image: string;
  status: boolean;
  isDeleted: boolean;
  user: ObjectId;
}
