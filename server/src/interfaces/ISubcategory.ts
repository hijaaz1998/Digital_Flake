import { Document } from 'mongoose';
import { IUser } from './IUser';
import { ICategory } from './ICategory';

export interface ISubcategory extends Document {
  name: string;
  image: string;
  status: boolean;
  isDeleted: boolean;
  user: IUser['_id'];
  category: ICategory['_id'];
  createdAt: Date;
  updatedAt: Date;
}
