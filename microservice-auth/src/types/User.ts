import {Request} from "express"

/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
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