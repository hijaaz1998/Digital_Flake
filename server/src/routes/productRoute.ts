import express from 'express';
import { addProduct, deleteProducts, getProducts, updateProducts } from '../controller/productController';

const productRouter = express.Router();

productRouter.route('/product')
   .post(addProduct)
   .get(getProducts)
   .put(updateProducts)
   .delete(deleteProducts)

export default productRouter