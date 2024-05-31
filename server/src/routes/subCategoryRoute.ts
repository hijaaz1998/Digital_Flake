import express from 'express';
import { addSubCategory, getSubcategories, getSingleSubcategory } from '../controller/subCategoryController';


const subCategoryRouter = express.Router()

subCategoryRouter.route('/sub_category')
   .post(addSubCategory)
   .get(getSubcategories)

subCategoryRouter.get('/sub_category/:id', getSingleSubcategory)


export default subCategoryRouter

