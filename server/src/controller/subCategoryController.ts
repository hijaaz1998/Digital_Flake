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

export const getSingleSubcategory = async (req: Request, res: Response) => {
   try {
      const id = req.params.id;
      const {userId} = req.query

      const subCategories = await Subcategory.findOne({ user: userId, _id: id})
         .populate('category', 'name _id')

      console.log(subCategories)

      res.status(200).json({subCategories})
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
      return;
   }
}

export const updateSubcategory = async (req: Request, res: Response): Promise<void> => {
   try {
      const { subcategoryName, category, status, image } = req.body;
      const { id } = req.params;

      const updateData: any = {
         name: subcategoryName,
         category: category,
         status: status
      };

      if (image) {
         updateData.image = image;
      }

      const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedSubcategory) {
         res.status(404).json({ success: false, message: 'Subcategory not found' });
         return;
      }

      res.status(200).json({ success: true, message: 'Subcategory updated successfully' });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Server error' });
   }
}

export const deleteSubcategory = async (req: Request, res: Response) => {
   try {

      const id = req.params.id;
 
      const updatedSubcategory = await Subcategory.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
      if (!updatedSubcategory) {
         return res.status(404).json({ message: 'Subcategory not found', success: false });
      }
      res.status(200).json({ message: 'Subcategory soft deleted successfully', success: true });
      return;
      
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Internal server error', success: false });
   }
}
