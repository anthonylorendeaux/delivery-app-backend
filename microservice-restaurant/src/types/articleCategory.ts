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

export interface IArticleCategory extends Document {
  id: ObjectId;
  name: String;
}

export interface IGetArticleCategoryReq extends Request<{ id: IArticleCategory['id']}> {}
export interface ICreateArticleCategoryReq extends Request<any, any,IArticleCategory> {}
export interface IUpdateArticleCategoryReq extends Request <{id: IArticleCategory['id']}, any, IArticleCategory> {}
export interface IDeleteArticleCategoryReq extends Request <{ id: IArticleCategory['id']}>{} 