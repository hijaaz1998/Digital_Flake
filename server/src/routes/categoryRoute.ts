import express from 'express';
import { addCategory, getCategories, updateCategory, deleteCategory, getPopulatedCategories, getSingleCategory } from '../controller/categoryController';

const categoryRoute = express.Router();

categoryRoute.route('/category')
  .post(addCategory)
  .get(getCategories)
  .put(updateCategory)
  .delete(deleteCategory);

categoryRoute.get('/category/:id', getSingleCategory)

categoryRoute.get('/categories', getPopulatedCategories )

export default categoryRoute;
