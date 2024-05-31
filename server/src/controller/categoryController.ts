import { Request, Response } from "express";
import { ICategory } from "../interfaces/ICategory";
import Category from "../models/categoryModel";
import Subcategory from "../models/subCategorymodel";

export const addCategory = async (req: Request, res: Response): Promise<void> => {
   try {
     const { categoryName, image, userId } = req.body;
 
     const lowerCaseCategoryName = categoryName.toLowerCase();
 
     const existingCategory = await Category.findOne({ name: lowerCaseCategoryName, user: userId });
 
     if (existingCategory) {
       res.status(400).json({ message: "Category already exists.", success: false });
       return;
     }
 
     const newCategory: ICategory = new Category({
       name: lowerCaseCategoryName,
       image,
       user: userId,
     });
 
     await newCategory.save();
 
     res.status(201).json({ message: "Category created successfully.", success: true });
     return
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Server error.", success: false });
     return
   }
 };

 export const getCategories = async (req: Request, res: Response): Promise<void> => {
   try {
     const { userId } = req.query;
 
     const categories = await Category.find({ user: userId, isDeleted: false });
     console.log(categories)
     res.status(200).json({categories});
     return
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Server error" });
     return
   }
 };

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
   try {
      
   } catch (error) {
      console.log(error)
   }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
   try {
      
   } catch (error) {
      console.log(error)
   }
}

export const getPopulatedCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find({ isDeleted: false });

    const populatedCategories = await Promise.all(categories.map(async (category) => {
      const subcategories = await Subcategory.find({ category: category._id, isDeleted: false });
      return { ...category.toObject(), subcategories };
    }));

    console.log('populated', populatedCategories)

    res.status(200).json({ categories: populatedCategories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
  
export const getSingleCategory = async (req: Request, res: Response) => {
  try {

    const id = req.params.id;
    const {userId} = req.query

    const category = await Category.findOne({user: userId, _id: id})
    console.log("cat",category)

    res.status(200).json({category})
    
  } catch (error) {
    console.log(error)
  }
} 