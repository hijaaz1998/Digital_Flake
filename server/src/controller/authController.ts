import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import User from '../models/userModel';
import passwordEncrypt from '../helpers/passwordEncrypt';
import passwordDecrypt from '../helpers/passwordDecrypt';
import { createToken } from '../helpers/jwt'


export const registerUser = async (req: Request, res: Response): Promise<void> => {
   try {
      
      const {name, email, password} = req.body;

      const existingUser = await User.findOne({email});

      if(existingUser){
         res.status(400).json({message: 'Email already exists', success: false})
         return;
      }

      const encryptedPassword = await passwordEncrypt(password);

      const user: IUser = new User({
         name,
         email,
         password: encryptedPassword
      })
      
      await user.save();

      res.status(201).json({message: 'Registration successfull', success: true})
      return

   } catch (error) {
      res.status(500).json({message: 'Internal server error', success: false});
      return
   }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
   try {
      const {email, password} = req.body;
      console.log(req.body)

      const userData = await User.findOne({email})

      if(!userData){
         res.status(401).json({message: 'Invalid email or password'})
         return
      }

      const matchedPassword = await passwordDecrypt(password, userData?.password)

      if(!matchedPassword){
         res.status(401).json({message: 'Invalid email or password', success: false})
         return
      }

      const jwt = createToken(userData?._id as string)

      res.json({message: 'Login successfull', success: true, token: jwt, userId: userData._id})
      return

   } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Error loggong inuser', success: false})
      return
   }
}

export const googleAuth = (req: Request, res: Response) => {

}