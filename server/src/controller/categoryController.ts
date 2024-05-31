import { Request, Response } from "express";
import { ICategory } from "../interfaces/ICategory";
import Category from "../models/categoryModel";
import Subcategory from "../models/subCategorymodel";

export const addCategory = async (req: Request, res: Response): Promise<void> => {
   try {
     const { categoryName, image, userId } = req.body;
 
     const upperCaseCategory = categoryName.toUpperCase();
 
     const existingCategory = await Category.findOne({ name: upperCaseCategory, user: userId });
 
     if (existingCategory) {
       res.status(400).json({ message: "Category already exists.", success: false });
       return;
     }
 
     const newCategory: ICategory = new Category({
       name: upperCaseCategory,
       image,
       user: userId,
     });
 
     await newCategory.save();
 
     res.status(201).json({ message: "Category created successfully.", success: true });
     return
     
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Server error.", success: false });
   }
 };

 export const getCategories = async (req: Request, res: Response): Promise<void> => {
   try {
     const { userId } = req.query;
 
     const categories = await Category.find({ user: userId, isDeleted: false });

     res.status(200).json({categories});
     return 

     return
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: "Server error" });
     return
   }
 };

 export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
     const { categoryName, status, image } = req.body;
     const { id } = req.params;

     const updateData: any = {
        name: categoryName,
        status: status
     };

     if (image) {
        updateData.image = image;
     }

     const updatedCategory = await Category.findByIdAndUpdate(id, updateData, { new: true });

     if (!updatedCategory) {
        res.status(404).json({ success: false, message: 'Category not found' });
        return;
     }

     res.status(200).json({ success: true, message: 'Category updated' });
     return

  } catch (error) {
     console.log(error);
     res.status(500).json({ success: false, message: 'Server error' });
  }
}

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {

     const id = req.params.id;

     const updatedCategory = await Category.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
     if (!updatedCategory) {
        res.status(404).json({ message: 'Category not found', success: false });
        return
     }

     res.status(200).json({ message: 'Category soft deleted successfully', success: true });
     return
     
  } catch (error) {
     console.log(error);
     res.status(500).json({ message: 'Internal server error', success: false });
  }
}


export const getPopulatedCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find({ isDeleted: false });

    const populatedCategories = await Promise.all(categories.map(async (category) => {
      const subcategories = await Subcategory.find({ category: category._id, isDeleted: false });
      return { ...category.toObject(), subcategories };
    }));

    res.status(200).json({ categories: populatedCategories });
    return

  } catch (error) {
    console.log( error);
    res.status(500).json({ error: 'Internal server error', success: false });
  }
}
  
export const getSingleCategory = async (req: Request, res: Response): Promise<void> => {
  try {

    const id = req.params.id;
    const {userId} = req.query

    const category = await Category.findOne({user: userId, _id: id})

    res.status(200).json({category})
    return
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal server error', success: false });
  }
} 