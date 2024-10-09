import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export const generateToken = ( token ) => {
    return jwt.sign(token, secret, { expiresIn: '1h' })
};
