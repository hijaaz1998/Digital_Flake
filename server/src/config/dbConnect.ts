import mongoose, { ConnectOptions } from "mongoose";

const dbURL = process.env.DB_URL;
const dbName: string = 'Digital_Flake';

if (!dbURL) {
  throw new Error('DB_URL environment variable is not defined');
}

const dbConnect = {
  connect: () => {
    const options: ConnectOptions = { dbName };

    mongoose.connect(dbURL, options)
      .then(() => console.log('Connected to MongoDB'))
      .catch(error => console.error('Error connecting to MongoDB:', error));
  }
}

export default dbConnect;
