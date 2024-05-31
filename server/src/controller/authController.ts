import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import User from '../models/userModel';
import passwordEncrypt from '../helpers/passwordEncrypt';
import passwordDecrypt from '../helpers/passwordDecrypt';
import { createToken } from '../helpers/jwt'
import { otpGenerator } from '../helpers/otpGenerator';
import nodemailer from 'nodemailer';


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

export const sendOtp = async (req: Request, res: Response): Promise<void> => {
   try {
     const { email } = req.body;
     const exisiting = await User.findOne({email});

     if(!exisiting){
      res.status(404).json({message: 'Incorrect email', success: false})
      return
     }
     const RegisterOtp = otpGenerator(); 
 
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       host: 'smtp.gmail.com',
       port: 587,
       auth: {
         user: 'muhammadijasbtc@gmail.com',
         pass: 'lcui urmh witl gaah',
       },
     });
 
     const mailOptions = {
       from: 'test@wristcrafts.com',
       to: email,
       subject: 'Your OTP',
       text: `Your OTP is ${RegisterOtp}`,
     };
 
     transporter.sendMail(mailOptions, (error) => {
       if (error) {
         console.log(error);
         res.status(500).json({ success: false, message: 'Failed to send OTP' });
       } else {
         console.log('Email sent:');
         console.log(RegisterOtp);
 
         res.json({
           success: true,
           otp: RegisterOtp,
           message: 'OTP has been sent',
         });
       }
     });
   } catch (error) {
     console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
   try {
      const { email, newPassword } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         res.status(404).json({ message: 'User not found', success: false });
         return;
      }

      const encryptedPassword = await passwordEncrypt(newPassword);

      user.password = encryptedPassword;

      await user.save();

      res.status(200).json({ message: 'Password reset successful', success: true });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', success: false });
   }
}

export const sendOtpSignup = async (req: Request, res: Response): Promise<void> => {
   try {
     const { email } = req.body;
     
     const RegisterOtp = otpGenerator(); 
 
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       host: 'smtp.gmail.com',
       port: 587,
       auth: {
         user: 'muhammadijasbtc@gmail.com',
         pass: 'lcui urmh witl gaah',
       },
     });
 
     const mailOptions = {
       from: 'test@wristcrafts.com',
       to: email,
       subject: 'Your OTP',
       text: `Your OTP for regstration is ${RegisterOtp}`,
     };
 
     transporter.sendMail(mailOptions, (error) => {
       if (error) {
         console.log(error);
         res.status(500).json({ success: false, message: 'Failed to send OTP' });
       } else {
         console.log('Email sent:');
         console.log(RegisterOtp);
 
         res.json({
           success: true,
           otp: RegisterOtp,
           message: 'OTP has been sent',
         });
       }
     });
   } catch (error) {
     console.log(error);
     res.status(500).json({ success: false, message: 'Internal server error' });
   }
};