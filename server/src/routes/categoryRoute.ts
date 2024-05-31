import express from 'express';
import { addCategory, getCategories, updateCategory, deleteCategory, getPopulatedCategories, getSingleCategory } from '../controller/categoryController';

const categoryRoute = express.Router();

categoryRoute.route('/category')
  .post(addCategory)
  .get(getCategories)

categoryRoute.route('/category/:id')
  .get(getSingleCategory)
  .put(updateCategory)
  .delete(deleteCategory)

categoryRoute.get('/categories', getPopulatedCategories )

export default categoryRoute;
