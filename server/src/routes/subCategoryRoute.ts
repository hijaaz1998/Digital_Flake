import express from 'express';
import { addSubCategory, getSubcategories, getSingleSubcategory, updateSubcategory, deleteSubcategory } from '../controller/subCategoryController';


const subCategoryRouter = express.Router()

subCategoryRouter.route('/sub_category')
   .post(addSubCategory)
   .get(getSubcategories)

subCategoryRouter.route('/sub_category/:id')
   .get(getSingleSubcategory)
   .put(updateSubcategory)
   .delete(deleteSubcategory)


export default subCategoryRouter

