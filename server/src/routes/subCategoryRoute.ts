import express from 'express';
import { addSubCategory, getSubcategories } from '../controller/subCategoryController';


const subCategoryRouter = express.Router()

subCategoryRouter.route('/sub_category')
   .post(addSubCategory)
   .get(getSubcategories)


export default subCategoryRouter

