import jwt from 'jsonwebtoken';
import { IUser } from '../types/User';
import "dotenv/config"

export function generateAuthToken(id: IUser['id'], email: IUser['email']) {
    const token = jwt.sign({_id: id, email: email}, "anthony", {
        expiresIn: '2h',
    });

    return token;
};

export function generateRefreshToken(id: IUser['id'], email: IUser['email']) {
    const refreshToken = jwt.sign({_id: id, email: email}, "laetitia", {
        expiresIn: '7d',
    });

    return refreshToken;
}

export function verifyToken(token: string, key: string) {
    try {
        const tokenDatas = jwt.verify(token, key);
        return tokenDatas
    } catch(err) {
        throw err;
    }
}

