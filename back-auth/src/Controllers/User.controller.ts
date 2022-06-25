import { Request, Response } from "express";
import { createUser, deleteUser, findAllUsers, findUser, updateUser } from "../service/User.service";
import { ICreateUserReq, IDeleteUserReq, IGetUserReq, IUpdateUserReq } from "../types/User";
import Logger from '../utils/logger';
import bcrypt from 'bcrypt';
import {generateAuthToken, generateRefreshToken, verifyToken} from '../utils/jwt';
import jwt from 'jsonwebtoken';


export async function createUserHandler(
  req: Request,
  res: Response
) {
  const body = req.body;

  const user = await createUser(body);
  
  return res.send(user);
}

export async function getUserHandler(
  req: IGetUserReq,
  res: Response
) {
  const id = req.params.id;

  const user = await findUser(id);

  if(!user) {
    return res.status(404).send({
      message: `User with id ${id} does not exist`
    });
  }

  return res.send(user);
}

export async function getAllUsersHandler(
  req: Request,
  res: Response
){
  const users = await findAllUsers();

  Logger.info(users);
  return res.send(users);
}

export async function updateUserHandler(
  req: IUpdateUserReq,
  res: Response
) {
  const id = req.params.id;
  const body = req.body;

  const user = await updateUser(id,body);

  if(!user) {
    return res.status(404).send({
      message: `User with id ${id} does not exist`
    });
  }
  
  return res.send(user);
}

export async function deleteUserHandler(
  req: IDeleteUserReq,
  res: Response
) {
  const id = req.params.id;

  const user = await deleteUser(id);

  if(!user) {
    return res.status(404).send({
      message: `User with id ${id} does not exist`
    });
  }

  return res.send(user);
}



