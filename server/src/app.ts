import 'dotenv/config';
import cors from 'cors';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from './config/dbConnect';
import authRouter from './routes/authRoute';
import categoryRoute from './routes/categoryRoute';
import subCategoryRouter from './routes/subCategoryRoute';
import productRouter from './routes/productRoute';

const app = express();

// Connect to MongoDB
mongoose.connect();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRouter);
app.use('/api', categoryRoute);
app.use('/api', subCategoryRouter)
app.use('/api', productRouter)

// Start the server
app.listen(9999, () => {
  console.log('Server started on port 9999');
});
