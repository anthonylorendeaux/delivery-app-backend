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

export interface ILocation extends Document {
  id: ObjectId;
  location: String;
}

export interface IGetLocationReq extends Request<{ id: ILocation['id']}> {}
export interface ICreateLocationReq extends Request<any, any,ILocation> {}
export interface IUpdateLocationReq extends Request <{id: ILocation['id']}, any, ILocation> {}
export interface IDeleteLocationReq extends Request <{ id: ILocation['id']}>{} 