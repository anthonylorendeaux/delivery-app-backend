import { Request, Response } from "express";
import { createSession, createUser, deleteUser, findAllUsers, findSession, findUser, findUserByEmail, updateSession, updateUser } from "../service/User.service";
import { ICreateUserReq, IDeleteUserReq, IGetUserReq, IUpdateUserReq } from "../types/User";
import Logger from '../utils/logger';
import bcrypt from 'bcrypt';
import {generateAuthToken, generateRefreshToken, verifyToken} from '../utils/jwt';
import jwt from 'jsonwebtoken';

export async function registerHandler(req: Request, res: Response) {
  Logger.info(req)
  let {email, password} = req.body;

  const userExists = await findUser(10);
  if(userExists) {
    return res.status(409).send({
      message: `User with email ${email} already exists`
    });
  }

  req.body.password = bcrypt.hashSync(password, 10);

  const createdUser = await createUser({
    ...req.body,
  })

  res.send(createdUser);
}

export async function loginHandler(req: Request, res: Response) {
  const { email, password} = req.body;

  const userExists = await findUserByEmail(email);
  if(!userExists) {
    return res.status(404).send({
      message: `User with email does not exist`
    });
  }

  const isValidPassword = bcrypt.compareSync(password, userExists.password);
  if(!isValidPassword) {
    return res.status(401).send({
      message: `Invalid password`
    });
  }

  const token = generateAuthToken(userExists.id, userExists.email, userExists.categoryId);
  const refreshToken = generateRefreshToken(userExists.id);

  res.send({ token, refreshToken })

  const existingSession = await findSession(userExists.id);
  if(existingSession) {
    Logger.warn(existingSession)
    await updateSession(userExists.id);
  }
  await createSession(userExists.id, token).then((e) => {
    Logger.info(`User ${userExists.email} connected`);
    Logger.debug(`Session : ${JSON.stringify(e)}`)
  });
}

declare module "jsonwebtoken" {
  export interface MyJwtPayload extends jwt.JwtPayload {
  _id: string;
  email: string;
  }
}

export async function refreshTokenHandler(req: Request, res: Response) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const refreshToken = auth.slice(7);

    if(!refreshToken) {
      return res.sendStatus(401)
    }

    try {
      const {_id, email, permission,iat, exp} = <jwt.MyJwtPayload>verifyToken(refreshToken, "refreshToken");

      const isDisconnected = await findSession(Number(_id));
      if(isDisconnected) {
        const refreshedToken = generateAuthToken(Number(_id), email, permission);
        res.send({ token: refreshedToken });
      } else {
        throw new Error("User is disconnected");
      }
    } catch (err) {
      Logger.error(err)
      return res.sendStatus(401)
    }
  } else {
    throw new Error('Authentication error');
  }
}

export async function disconnectUserHandler(req: Request, res: Response) {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    const token = auth.slice(7);

    if(!token) {
      return res.sendStatus(401)
    }

    try {
      const {_id, email, iat, exp} = <jwt.MyJwtPayload>verifyToken(token, "token");

      const session = await updateSession(Number(_id));

      res.send(session);
    } catch (err) {
      Logger.error(err)
      return res.sendStatus(401)
    }
  } else {
    throw new Error('Authentication error');
  }
}



