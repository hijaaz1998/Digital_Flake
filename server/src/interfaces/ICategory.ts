import { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
  status: boolean;
  isDeleted: boolean;
  user: Schema.Types.ObjectId;
}
