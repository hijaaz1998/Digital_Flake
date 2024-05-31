import { Request, Response } from "express";
import Product from "../models/productModel";
import { IProduct } from "../interfaces/IProduct";
import Subcategory from "../models/subCategorymodel";
import Category from "../models/categoryModel";


export const addProduct = async (req: Request, res: Response): Promise<void> => {
   try {
      const { category, image, productName, subcategory, userId } = req.body; 

      console.log("addprod", req.body);

      const upperCaseProduct = productName.toUpperCase();

      const existingProduct = await Product.findOne({ name: upperCaseProduct, user: userId });

      if (existingProduct) {
         res.status(400).json({ message: "Product already exists.", success: false });
         return;
      }

      const newProduct: IProduct = new Product({
         name: upperCaseProduct,
         category,
         subcategory,
         image,
         user: userId,
      });

      await newProduct.save();

      res.status(201).json({ message: "Product created successfully.", success: true });
      return

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error.", success: false });
   }
}


export const getProducts = async (req: Request, res: Response): Promise<void> => {
   try {
     const { userId } = req.query;
 
     let allProducts = await Product.find({ user: userId, isDeleted: false });
 
     const products = await Promise.all(allProducts.map(async (product) => {
       const category = await Category.findOne({ _id: product.category, isDeleted: false }).select('name _id');
       const subcategory = await Subcategory.findOne({ _id: product.subcategory, isDeleted: false }).select('name _id');
       
       return {
         ...product.toObject(),
         category,
         subcategory
       };
     }));
  
     res.status(200).json({ status: 'success', products });
     return

   } catch (error) {
     console.log(error); 
     res.status(500).json({ status: 'error', message: 'Failed to fetch products' });
   }
};


export const updateProducts = async (req: Request, res: Response): Promise<void> => {
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

export const deleteProducts = async (req: Request, res: Response): Promise<void> => {
   try {

      const id = req.params.id;

      const updatedProduct = await Product.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (!updatedProduct) {
         res.status(404).json({ message: 'Product not found', success: false });
         return
      }
      res.status(200).json({ mesrsage: 'Product soft deleted successfully', success: true });
      return

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error', success: false });
   }
}


export const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
   try {
      const id = req.params.id;
      const { userId } = req.query;

      const product = await Product.findOne({ user: userId, _id: id })
                                  .populate('category', 'name _id')
                                  .populate('subcategory', 'name _id');

      const subCategories = await Subcategory.find({category: product?.category})
      
      res.status(200).json({ product, subCategories });
      return
      
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
   }
}
