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

export interface IRestaurantCategory extends Document {
  id: ObjectId;
  name: String;
}

export interface IGetRestaurantCategoryReq extends Request<{ id: IRestaurantCategory['id']}> {}
export interface ICreateRestaurantCategoryReq extends Request<any, any,IRestaurantCategory> {}
export interface IUpdateRestaurantCategoryReq extends Request <{id: IRestaurantCategory['id']}, any, IRestaurantCategory> {}
export interface IDeleteRestaurantCategoryReq extends Request <{ id: IRestaurantCategory['id']}>{} 