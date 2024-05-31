import express from 'express';
import { registerUser, loginUser, sendOtp, resetPassword, sendOtpSignup } from '../controller/authController';

const authRouter = express.Router();

authRouter.post('/signup', registerUser);
authRouter.post('/login', loginUser);
authRouter.post('/send_otp', sendOtp);
authRouter.post('/send_otp_signup', sendOtpSignup);
authRouter.post('/reset_password', resetPassword);


export default authRouter;
