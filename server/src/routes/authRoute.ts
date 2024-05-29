import express from 'express';
import { registerUser, loginUser, googleAuth } from '../controller/authController';

const authRouter = express.Router();

authRouter.get('/register', registerUser);
// authRouter.post('/login', loginUser);
// authRouter.post('/googleAuth', googleAuth);

export default authRouter;
