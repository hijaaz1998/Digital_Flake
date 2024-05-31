import express from 'express';
import { addProduct, deleteProducts, getProducts, updateProducts, getSingleProduct } from '../controller/productController';

const productRouter = express.Router();

productRouter.route('/product')
   .post(addProduct)
   .get(getProducts)

productRouter.route('/product/:id')
   .get(getSingleProduct)
   .put(updateProducts)
   .delete(deleteProducts)

export default productRouter