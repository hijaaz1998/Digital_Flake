import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

export default User;
