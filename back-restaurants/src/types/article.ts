import {Request} from "express"
import { ObjectId } from "mongodb";
import { Document, Types } from "mongoose"

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

export interface IArticle extends Document {
  id: ObjectId;
  restaurantId: ObjectId;
  articleCategory: Types.ObjectId;
  name: String;
  description: String;
  picture: String;
  price: String; 
}

export interface IGetArticleReq extends Request<{ id: IArticle['id']}> {}
export interface ICreateArticleReq extends Request<any, any,IArticle> {}
export interface IUpdateArticleReq extends Request <{id: IArticle['id']}, any, IArticle> {}
export interface IDeleteArticleReq extends Request <{ id: IArticle['id']}>{} 