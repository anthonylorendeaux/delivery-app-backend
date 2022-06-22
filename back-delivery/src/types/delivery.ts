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

export interface IDelivery extends Document {
  id: ObjectId;
  vehicle: String;
  rating: Number;
  Available: Boolean;
}

export interface IGetDeliveryReq extends Request<{ id: IDelivery['id']}> {}
export interface ICreateDeliveryReq extends Request<any, any,IDelivery> {}
export interface IUpdateDeliveryReq extends Request <{id: IDelivery['id']}, any, IDelivery> {}
export interface IDeleteDeliveryReq extends Request <{ id: IDelivery['id']}>{} 