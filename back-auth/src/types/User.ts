import {Request} from "express"

/**
 * @openapi
 * components:
 *   schema:
 *     User:
 *       type: object
 *       required:
 *        - name
 *        - email
 *        - profilePicture
 *        - phone
 *        - password
 *        - surname
 *        - isSuspended
 *        - categoryId
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         profilePicture:
 *           type: string
 *         phone:
 *           type: string
 *         password:
 *           type: string
 *         surname:  
 *           type: string
 *         isSuspended:
 *           type: boolean
 *         categoryId:
 *           type: number  
 */

export interface IUser {
  id: number,
  name: string,
  email: string,
  profilePicture: string
  phone: string,
  password: string,
  surname: string,
  isSuspended: boolean,
  createdAt: Date,
  updatedAt: Date,
  categoryId: number,
}

export interface IGetUserReq extends Request<{ id: IUser['id']}> {}
export interface ICreateUserReq extends Request<any, any,IUser> {}
export interface IUpdateUserReq extends Request <{id: IUser['id']}, any, IUser> {}
export interface IDeleteUserReq extends Request <{ id: IUser['id']}>{}