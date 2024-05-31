import express from 'express';
import { addProduct, deleteProducts, getProducts, updateProducts, getSingleProduct } from '../controller/productController';

const productRouter = express.Router();

productRouter.route('/product')
   .post(addProduct)
   .get(getProducts)
   .put(updateProducts)
   .delete(deleteProducts)

productRouter.get('/product/:id', getSingleProduct)

export default productRouter