import jwt, {SignOptions, VerifyOptions} from 'jsonwebtoken';
import { IUser } from '../types/User';
import fs from 'fs';
import path from 'path';
import "dotenv/config"
import Logger from './logger';

const signOptionsToken: SignOptions = {
        expiresIn: '2h', 
        algorithm: 'RS256'
}

const signOptionsRefresh: SignOptions = {
        expiresIn: '7d',
        algorithm: 'RS256'
}

const verifyOptions: VerifyOptions = {
    algorithms: ['RS256']
  }

export function generateAuthToken(id: IUser['id'], email: IUser['email'], permission: IUser['categoryId']){
    try {
        const token = jwt.sign({_id: id, email: email, permission: String(permission)}, tokenPrivateKey, signOptionsToken);
        return token;
    } catch(err) {
        throw err;
    }
};

export function generateRefreshToken(id: IUser['id']) {
    try {
        const refreshToken = jwt.sign({_id: id}, tokenPrivateKey, signOptionsRefresh);
        return refreshToken;    
    } catch(err) {
        throw err;
    }
}

export function verifyToken(token: string, key: "token" | "refreshToken") {
    try {
        if(key === "token") {
            const tokenDatas = jwt.verify(token, tokenPublicKey, verifyOptions);
            return tokenDatas
        } else {
            const tokenDatas = jwt.verify(token, tokenPrivateKey, verifyOptions);
            return tokenDatas
        }
    } catch(err) {
        throw err;
    }
}

export const tokenPrivateKey = `
-----BEGIN RSA PRIVATE KEY-----
MIICXgIBAAKBgQDMGm9gnzviQeKc3K5G1u1Ld4+mVVCN/r5+njzqw5C+Ekkd/fRh
x8nRszju4sXadVBAXJx4H0peOMZ4vZJcsHeg8gLE3EviBzotq7kTODdwpIlC4lzJ
Lc7hSv2MQZ3+w/VaUhssdsRCDDq1ahr7j9h7bdOBTWKneqohAULX3XTH2QIDAQAB
AoGBAJ+NisPdttKI7r3xRcva+GWmcYV17CMUoZYZ3UUo3F25ra7kd8Z4iCyGDluw
qzq7uqCVxTuiOmCtwXlhuKj8yoaAzCC52TJMsCI8t4rFDHCcZ70qxdT17C/Mw/mY
7S+Cq1J0EC1Bhm2ny/jJcibnuBXZFDiaorr/z39DsgEBXeIBAkEA8MJLBaC0FltQ
vVHVmVtYAaCJokPjqAtpZzV2q3VKiju59Kq2sH83oYtIf8RqPdNqym6VFf93ABo6
HngidTxABQJBANkGGtP7EZvzk1AiIGA5DMJylvBzuJyfn0Kp1NevI0bc29nUEjpr
LlK7aj/9a+804yQQP0pHayY+CaXxinUEtMUCQAZYKF/ylyxLpboHcQiEhrIsR9Q1
08b23gUxPHpSMe+omULgSMYn5BBmujdbtq0AaD0DYvxcagdfqY5p/gZ22v0CQQCm
iKq5k+W1WDnouedCL0T9SVVN+l7lwQ9C5nOvdnOJgx0pkDTUoz6OucYUiHD0xA6w
s879PsSYOe7JagonNY9JAkEArZVkDv4W6ji7INpW7eksdowLxkMxhRPU0EDmZQEj
/03bDSyYoYtuhjqUxW2xei8WiBVzxB+Nz4br+gk6+F77Pw==
-----END RSA PRIVATE KEY-----`;

export const tokenPublicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDMGm9gnzviQeKc3K5G1u1Ld4+m
VVCN/r5+njzqw5C+Ekkd/fRhx8nRszju4sXadVBAXJx4H0peOMZ4vZJcsHeg8gLE
3EviBzotq7kTODdwpIlC4lzJLc7hSv2MQZ3+w/VaUhssdsRCDDq1ahr7j9h7bdOB
TWKneqohAULX3XTH2QIDAQAB
-----END PUBLIC KEY-----`;

export const refreshTokenPrivateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgHzfGxM+IJW3ET9+6Yp4//gVdls6ae+j/e947z5r6xeB4MuxOE49
6vGymrTJ+yEWPez3iUGcufFlx11jpgvRWBDq970EruECSr9E+syFOdxQaufBx/X8
XejRYqj7dZaaQ/2S4OVtwvHasJdipnVm+VYtDPK53F+liMJ1aIz1iPwVAgMBAAEC
gYBl2N7PchPHqNnzjQLUg15bLL4tKFaxM3Nxd5TCt+i2cqMz3+bJwiy3V/Jg1ID0
epylgzw6/KaYYmgaHqWW6/dEIZ+KHysHb7uIGxamvlBG+LvlIzyD5QG/tNpI4Mbs
bOY7wR6R4L18zDMnaPiOoXDfGusjPmOP3gzrHdEfaF2OXQJBAOGRyZjOrxg0Qwqq
Vrlmf612WnvBZNLPEk6ql8XLd3ULGJKz3wvb6iuMDUUN/WbiICIzzOkcdmrW6Rip
2a6Y+xMCQQCNt6M6Cvg+TCUUXYuRfNVCNoZBs97QE8ZOQe/QWUwX6OWAentG7XlJ
aN1o4znjdoASJVlIdATxFva7M8XFVyk3AkEAjQ7VCcjeN/2emxHQb9pIJ5pmlRNo
UGgLo8QMazWEu123/S2cYtcgRiErvy4zc94eiCTqlDAnYUKJu9GjfgrOnwJAY1c7
AFD4OxM9Ws1ILLAI/eUir6PaqJl0BR+Lb81o3cnQNwOkrs+Amcj8i63cwmoq1I2B
zJwnaqjiQ8/C7tZueQJBANdGMQg06SJ2V3hP5/nEZBnioj6rq49Eq5LgcvIG0ETD
cZ+85umTABzhQL6N7Yu2DK1XVnY+4MEo8gSLjp3MN8c=
-----END RSA PRIVATE KEY-----`
export const refreshTokenPublicKey = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHzfGxM+IJW3ET9+6Yp4//gVdls6
ae+j/e947z5r6xeB4MuxOE496vGymrTJ+yEWPez3iUGcufFlx11jpgvRWBDq970E
ruECSr9E+syFOdxQaufBx/X8XejRYqj7dZaaQ/2S4OVtwvHasJdipnVm+VYtDPK5
3F+liMJ1aIz1iPwVAgMBAAE=
-----END PUBLIC KEY-----`


