import {Request} from "express"
import { ObjectId } from "mongodb";
import { Document } from "mongoose"

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

export interface IProduct extends Document {
  id: ObjectId,
  title: String;
  description: String;
  price: Number;
  image: String;
}

export interface IGetProductReq extends Request<{ id: IProduct['id']}> {}
export interface ICreateProductReq extends Request<any, any,IProduct> {}
export interface IUpdateProductReq extends Request <{id: IProduct['id']}, any, IProduct> {}
export interface IDeleteProductReq extends Request <{ id: IProduct['id']}>{}