import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

export const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

export const generateRandomPassword = async (length) => {

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=';

    let generatedPassword = '';

    for (let i = 0; i < length; i++) {
        generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return generatedPassword;
}