import { Request, Response } from "express";
import Subcategory from "../models/subCategorymodel";
import { ISubcategory } from "../interfaces/ISubcategory";

export const addSubCategory = async (req: Request, res: Response) => {
   try {

      const {subcategoryName, category, image, userId} = req.body

      const lowrCaseSubcategoryName = subcategoryName.toLowerCase();

      const existingSubcategory = await Subcategory.findOne({ name: lowrCaseSubcategoryName, user: userId });

      if(existingSubcategory){
         res.status(400).json({ message: "Subcategory already exists.", success: false });
       return;
      }

      const newSubcategory: ISubcategory = new Subcategory({
         name:lowrCaseSubcategoryName,
         image,
         category,
         user: userId
      })

      await newSubcategory.save();

      res.status(201).json({message: 'Subcategory created successfully', success: true})

   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error.", success: false });
      return
   }
}

export const getSubcategories = async (req: Request, res: Response) => {
   try {
     const { userId } = req.query;
 
     const subCategories = await Subcategory.find({ user: userId, isDeleted: false })
       .populate('category', 'name');
     console.log(subCategories);
     res.status(200).json({ subCategories });
     return;
   } catch (error) {
     console.log(error);
     res.status(500).json({ message: 'Server error' });
     return;
   }
};

