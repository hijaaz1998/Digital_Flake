import { Request, Response } from "express";
import Product from "../models/productModel";
import { IProduct } from "../interfaces/IProduct";
import Subcategory from "../models/subCategorymodel";


export const addProduct = async (req: Request, res: Response) => {
   try {
      const { category, image, productName, subcategory, userId } = req.body; // Ensure correct field names

      console.log("addprod", req.body);

      const lowerCaseProduct = productName.toLowerCase();

      const existingProduct = await Product.findOne({ name: lowerCaseProduct, user: userId });

      if (existingProduct) {
         res.status(400).json({ message: "Product already exists.", success: false });
         return;
      }

      const newProduct: IProduct = new Product({
         name: lowerCaseProduct,
         category,
         subcategory, // Ensure correct field name
         image,
         user: userId,
      });

      await newProduct.save();

      res.status(201).json({ message: "Product created successfully.", success: true });

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error.", success: false });
      return;
   }
}


export const getProducts = async (req: Request, res: Response) => {
   try {
      const { userId } = req.query;
      console.log('UserId:', userId); // Log userId for debugging


      const products = await Product.find({ user: userId, isDeleted: false })
        .populate('category', 'name _id') 
        .populate('subcategory', 'name _id'); 

      console.log('Products:', products); // Log products for debugging

      res.status(200).json({ status: 'success', products });
   } catch (error) {
      console.log('Error:', error); // Log error for debugging
      res.status(500).json({ status: 'error', message: 'Failed to fetch products' });
   }
}



export const updateProducts = async (req: Request, res: Response) => {
   try {

      const {name, category, subcategory, image, status} = req.body

      const {id} = req.params;

      const updateData: any = {
         name,
         category,
         subcategory,
         status,
      };

      if (image) {
         updateData.image = image;
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {new: true})

      if (!updatedProduct) {
         res.status(404).json({ success: false, message: 'Product not found' });
         return;
      }

      res.status(200).json({ success: true, mesage: 'Product updated successfully' });

   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Server error' });
   }
}

export const deleteProducts = async (req: Request, res: Response) => {
   try {

      const id = req.params.id;

      const updatedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (!updatedProduct) {
         return res.status(404).json({ message: 'Product not found', success: false });
      }
      res.status(200).json({ message: 'Product soft deleted successfully', success: true });
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error', success: false });
   }
}


export const getSingleProduct = async (req: Request, res: Response) => {
   try {
      const id = req.params.id;
      const { userId } = req.query;

      const product = await Product.findOne({ user: userId, _id: id })
                                  .populate('category', 'name _id')
                                  .populate('subcategory', 'name _id');

      const subCategories = await Subcategory.find({category: product?.category})
      
      res.status(200).json({ product, subCategories });


      
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
   }
}
