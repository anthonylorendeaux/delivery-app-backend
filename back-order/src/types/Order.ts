import {Request} from "express"
import { ObjectId } from "mongodb";
import { Document } from "mongoose"

/**
 * @openapi
 * components:
 *   schema:
 *     Article:
 *       type: object
 *       required:
 *        - name
 *        - description
 *        - price
 *        - picture  
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: string
 *         picture:
 *           type: string
 */

export interface IOrder extends Document {
  articles: Array<string>;
  menus: Array<string>;
  status: Array<string>;
  discount: Boolean;
  customerId: Number;
}

export interface IGetOrderReq extends Request<{ id: IOrder['id']}> {}
export interface ICreateOrderReq extends Request<any, any,IOrder> {}
export interface IUpdateOrderReq extends Request <{id: IOrder['id']}, any, IOrder> {}
export interface IDeleteOrderReq extends Request <{ id: IOrder['id']}>{} 