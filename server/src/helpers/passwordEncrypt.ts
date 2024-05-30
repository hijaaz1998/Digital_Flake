import bcrypt from 'bcrypt';

const passwordEncrypt = async (password: string): Promise<string> => {
    try {
        const securedPassword: string = await bcrypt.hash(password, 10);
        return securedPassword;
    } catch (error) {
        console.log(error);
        throw new Error('Error hashing password');
    }
};

export default passwordEncrypt;

