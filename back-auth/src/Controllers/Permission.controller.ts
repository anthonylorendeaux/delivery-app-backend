import { Request, Response } from "express";
import { createSession, createUser, deleteUser, findAllUsers, findSession, findUser, findUserByEmail, updateSession, updateUser } from "../service/User.service";
import { ICreateUserReq, IDeleteUserReq, IGetUserReq, IUpdateUserReq } from "../types/User";
import Logger from '../utils/logger';
import bcrypt from 'bcrypt';
import {generateAuthToken, generateRefreshToken, verifyToken} from '../utils/jwt';
import jwt from 'jsonwebtoken';

export async function restaurantPermissionHandler(req: Request, res: Response) {
    checkPermissions(req, res, 'restaurants');
}

export async function checkPermissions(req: Request, res: Response, category: string) {
    var categories: { [id: string] : Array<string>; } = {};
    categories["restaurants"] = ['Client', 'Admin'];
    categories["admin"] = ['Admin']; 

    const auth = req.headers.authorization;
    if (auth && auth.startsWith('Bearer')) {
      const token = auth.slice(7);
  
      if(!token) {
        return res.sendStatus(401)
      }
      try {
        const {_id, email, permission,iat, exp} = <jwt.MyJwtPayload>verifyToken(token, "token");
        const isConnected = await findSession(Number(_id));
        if(isConnected) {
          const user = await findUser(Number(_id));
          if(!user) {
            return res.sendStatus(404)
          }      
            const accessGranted = categories[category].indexOf(user.Category.name) > -1;
          if(accessGranted) {
            return res.sendStatus(200)
          } else {
            return res.sendStatus(401)
          }
        } else {
          throw new Error("User is disconnected");
        }
      } catch (err) {
        return res.sendStatus(401)
      }
    } else {
      throw new Error('Authentication error');
    }
}






