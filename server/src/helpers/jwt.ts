import jwt from 'jsonwebtoken';

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

export const createToken = (id: string | undefined): string => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
    }

    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: maxAge
    });
};
