import {Request} from "express"
import { ObjectId } from "mongodb";
import { Document } from "mongoose"
import { IArticle } from "./article";
import { IMenu } from "./menu";

/**
 * @openapi
 * components:
 *   schema:
 *     Restaurant:
 *       type: object
 *       required:
 *        - name
 *        - description
 *        - category
 *        - picture
 *        - rating 
 *        - workDays
 *        - workHours 
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         category:
 *           type: string
 *         picture:
 *           type: string
 *         rating:
 *           type: number
 *         workDays:
 *           type: Array<string>
 *         workHours:
 *           type: Array<string>
 */

export interface IRestaurant extends Document {
  id: ObjectId;
  name: String;
  description: String;
  categoryId: ObjectId;
  picture: String;
  rating: Number;
  workDays: Array<String>;
  workHours: Array<String>;
  menuIds: Array<ObjectId>[];
  articleIds: Array<ObjectId>[];
}

export interface IGetRestaurantReq extends Request<{ id: IRestaurant['id']}> {}
export interface ICreateRestaurantReq extends Request<any, any,IRestaurant> {}
export interface IUpdateRestaurantReq extends Request <any, any, IRestaurant> {}
export interface IDeleteRestaurantReq extends Request <{ id: IRestaurant['id']}>{} 